# Backend API & Database Design for Application System

## 📋 Database Design (Recommended Structure)

### Option 1: Polymorphic Design (RECOMMENDED) ✅

Bir əsas `applications` table + ayrı-ayrı detail tables:

```sql
-- Main applications table (common fields for all applicant types)
CREATE TABLE applications (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    applicant_type ENUM('student', 'agency') NOT NULL,

    -- Program Information
    degree_id INT NOT NULL,
    degree_name VARCHAR(100) NOT NULL,
    faculty_id INT NOT NULL,
    faculty_name VARCHAR(100) NOT NULL,

    -- Status & Tracking
    status ENUM('pending', 'under_review', 'approved', 'rejected') DEFAULT 'pending',
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewed_at TIMESTAMP NULL,
    reviewed_by INT NULL,

    -- Metadata
    ip_address VARCHAR(45) NULL,
    user_agent TEXT NULL,
    locale VARCHAR(5) DEFAULT 'en',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_status (status),
    INDEX idx_degree (degree_id),
    INDEX idx_faculty (faculty_id),
    INDEX idx_submitted_at (submitted_at)
);

-- Student-specific information
CREATE TABLE student_applications (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    application_id BIGINT NOT NULL UNIQUE,

    -- Personal Information
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    gender ENUM('male', 'female', 'other') NOT NULL,
    date_of_birth DATE NOT NULL,
    place_of_birth VARCHAR(100) NOT NULL,
    nationality VARCHAR(100) NOT NULL,
    native_language VARCHAR(50) NOT NULL,

    -- Contact Information
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,

    -- Address
    country VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    address_line TEXT NOT NULL,

    -- Documents (file paths)
    photo_id_path VARCHAR(255) NOT NULL,
    profile_photo_path VARCHAR(255) NULL,
    diploma_path VARCHAR(255) NULL,
    transcript_path VARCHAR(255) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE,
    INDEX idx_email (email),
    INDEX idx_phone (phone)
);

-- Agency-specific information
CREATE TABLE agency_applications (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    application_id BIGINT NOT NULL UNIQUE,

    -- Agency Information
    agency_name VARCHAR(255) NOT NULL,
    country VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    website VARCHAR(255) NULL,

    -- Contact Person
    contact_name VARCHAR(100) NOT NULL,
    contact_phone VARCHAR(20) NOT NULL,
    contact_email VARCHAR(255) NOT NULL,

    -- Documents (file paths)
    business_license_path VARCHAR(255) NULL,
    company_logo_path VARCHAR(255) NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE,
    INDEX idx_agency_name (agency_name),
    INDEX idx_contact_email (contact_email)
);

-- Application notes/comments (optional - for admin use)
CREATE TABLE application_notes (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    application_id BIGINT NOT NULL,
    admin_id INT NOT NULL,
    note TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE,
    INDEX idx_application (application_id)
);

-- Application status history (optional - for tracking)
CREATE TABLE application_status_history (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    application_id BIGINT NOT NULL,
    old_status VARCHAR(50) NULL,
    new_status VARCHAR(50) NOT NULL,
    changed_by INT NULL,
    note TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE,
    INDEX idx_application (application_id)
);
```

### Option 2: Single Table (NOT RECOMMENDED) ❌

```sql
-- Single table with nullable fields (NOT RECOMMENDED)
CREATE TABLE applications (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    applicant_type ENUM('student', 'agency') NOT NULL,

    -- Common fields
    degree_id INT NOT NULL,
    faculty_id INT NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',

    -- Student fields (NULL for agency)
    first_name VARCHAR(100) NULL,
    last_name VARCHAR(100) NULL,
    gender VARCHAR(20) NULL,
    -- ... many nullable fields

    -- Agency fields (NULL for student)
    agency_name VARCHAR(255) NULL,
    contact_name VARCHAR(100) NULL,
    -- ... many nullable fields

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**❌ Problems:**

- Çox nullable field-lər
- Data integrity problemləri
- Maintenance çətinliyi
- Performance issues
- Normalization pozulması

---

## 🚀 Backend API Endpoint Structure

### Laravel Example (PHP)

```php
// routes/api.php
Route::post('/apply', [ApplicationController::class, 'store']);

// app/Http/Controllers/ApplicationController.php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ApplicationController extends Controller
{
    public function store(Request $request)
    {
        // Validation
        $validator = Validator::make($request->all(), [
            'applicantType' => 'required|in:student,agency',
            'degreeId' => 'required|integer',
            'facultyId' => 'required|integer',
            // Add more validation rules based on applicant type
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        DB::beginTransaction();

        try {
            // Create main application
            $application = DB::table('applications')->insertGetId([
                'applicant_type' => $request->applicantType,
                'degree_id' => $request->degreeId,
                'degree_name' => $request->degreeName,
                'faculty_id' => $request->facultyId,
                'faculty_name' => $request->facultyName,
                'status' => 'pending',
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'locale' => $request->header('Accept-Language', 'en'),
                'submitted_at' => now(),
            ]);

            if ($request->applicantType === 'student') {
                $this->handleStudentApplication($request, $application);
            } else {
                $this->handleAgencyApplication($request, $application);
            }

            DB::commit();

            return response()->json([
                'status' => true,
                'message' => 'Application submitted successfully',
                'data' => [
                    'application_id' => $application,
                    'reference_number' => 'APP-' . str_pad($application, 8, '0', STR_PAD_LEFT)
                ]
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'status' => false,
                'message' => 'Failed to submit application',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    private function handleStudentApplication(Request $request, $applicationId)
    {
        // Upload files
        $photoIdPath = $request->file('photoId')->store('applications/students/photo_ids', 'public');
        $profilePhotoPath = $request->hasFile('profilePhoto')
            ? $request->file('profilePhoto')->store('applications/students/profiles', 'public')
            : null;
        $diplomaPath = $request->hasFile('diploma')
            ? $request->file('diploma')->store('applications/students/diplomas', 'public')
            : null;
        $transcriptPath = $request->file('transcript')->store('applications/students/transcripts', 'public');

        // Insert student details
        DB::table('student_applications')->insert([
            'application_id' => $applicationId,
            'first_name' => $request->firstName,
            'last_name' => $request->lastName,
            'gender' => $request->gender,
            'date_of_birth' => $request->dateOfBirth,
            'place_of_birth' => $request->placeOfBirth,
            'nationality' => $request->nationality,
            'native_language' => $request->nativeLanguage,
            'phone' => $request->phone,
            'email' => $request->email,
            'country' => $request->country,
            'city' => $request->city,
            'address_line' => $request->addressLine,
            'photo_id_path' => $photoIdPath,
            'profile_photo_path' => $profilePhotoPath,
            'diploma_path' => $diplomaPath,
            'transcript_path' => $transcriptPath,
        ]);
    }

    private function handleAgencyApplication(Request $request, $applicationId)
    {
        // Upload files
        $businessLicensePath = $request->hasFile('businessLicense')
            ? $request->file('businessLicense')->store('applications/agencies/licenses', 'public')
            : null;
        $companyLogoPath = $request->hasFile('companyLogo')
            ? $request->file('companyLogo')->store('applications/agencies/logos', 'public')
            : null;

        // Insert agency details
        DB::table('agency_applications')->insert([
            'application_id' => $applicationId,
            'agency_name' => $request->agencyName,
            'country' => $request->country,
            'city' => $request->city,
            'address' => $request->address,
            'website' => $request->website,
            'contact_name' => $request->contactName,
            'contact_phone' => $request->contactPhone,
            'contact_email' => $request->contactEmail,
            'business_license_path' => $businessLicensePath,
            'company_logo_path' => $companyLogoPath,
        ]);
    }
}
```

---

## 📊 Database Design Benefits

### ✅ Polymorphic Design (Recommended) Advantages:

1. **Data Integrity**: Hər applicant type üçün düzgün field-lər
2. **Normalization**: 3NF-ə uyğun
3. **Performance**: İndeksləmə effektiv
4. **Scalability**: Yeni applicant type əlavə etmək asan
5. **Maintenance**: Kod oxunaqıdır və maintain edilməsi asandır
6. **Queries**: Optimized join-lar
7. **Validation**: Type-specific validation asandır

### Example Queries:

```sql
-- Get all pending student applications
SELECT
    a.id,
    a.degree_name,
    a.faculty_name,
    a.status,
    a.submitted_at,
    sa.first_name,
    sa.last_name,
    sa.email,
    sa.phone
FROM applications a
INNER JOIN student_applications sa ON a.id = sa.application_id
WHERE a.applicant_type = 'student'
  AND a.status = 'pending'
ORDER BY a.submitted_at DESC;

-- Get all agency applications for a specific degree
SELECT
    a.id,
    a.degree_name,
    a.faculty_name,
    a.status,
    a.submitted_at,
    aa.agency_name,
    aa.contact_name,
    aa.contact_email
FROM applications a
INNER JOIN agency_applications aa ON a.id = aa.application_id
WHERE a.applicant_type = 'agency'
  AND a.degree_id = 1
ORDER BY a.submitted_at DESC;

-- Get application statistics
SELECT
    applicant_type,
    status,
    COUNT(*) as count
FROM applications
GROUP BY applicant_type, status;
```

---

## 🎯 Recommendation

**Use Polymorphic Design (Option 1)** because:

- ✅ Better data integrity
- ✅ Easier to maintain
- ✅ More flexible
- ✅ Better performance
- ✅ Follows database normalization principles
- ✅ Type-specific validations
- ✅ Cleaner code structure

---

## 📁 File Storage Structure

```
storage/
└── app/
    └── public/
        └── applications/
            ├── students/
            │   ├── photo_ids/
            │   ├── profiles/
            │   ├── diplomas/
            │   └── transcripts/
            └── agencies/
                ├── licenses/
                └── logos/
```

---

## 🔐 Additional Recommendations

1. **Add Email Notifications**: Müraciət göndərildikdə user-ə email
2. **Add Reference Number**: Hər application üçün unique ref number
3. **Add Admin Panel**: Müraciətləri review etmək üçün
4. **Add Status Updates**: Email notification status dəyişəndə
5. **Add Document Validation**: File type və size check
6. **Add Rate Limiting**: Spam əleyhinə
7. **Add CSRF Protection**: Security üçün
8. **Add Logging**: Audit trail üçün
