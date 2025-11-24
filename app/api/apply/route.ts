import { NextRequest, NextResponse } from "next/server";

interface ApplicationData {
  applicantType: string;
  degreeId: number;
  degreeName: string;
  facultyId: number;
  facultyName: string;
  submittedAt: string;
  ipAddress: string;
  userAgent: string;
  locale: string;
  studentInfo?: {
    firstName: FormDataEntryValue | null;
    lastName: FormDataEntryValue | null;
    gender: FormDataEntryValue | null;
    dateOfBirth: FormDataEntryValue | null;
    placeOfBirth: FormDataEntryValue | null;
    nationality: FormDataEntryValue | null;
    nativeLanguage: FormDataEntryValue | null;
    phone: FormDataEntryValue | null;
    email: FormDataEntryValue | null;
    country: FormDataEntryValue | null;
    city: FormDataEntryValue | null;
    addressLine: FormDataEntryValue | null;
    documents?: {
      photoId: { name: string; size: number; type: string } | null;
      profilePhoto: { name: string; size: number; type: string } | null;
      diploma: { name: string; size: number; type: string } | null;
      transcript: { name: string; size: number; type: string } | null;
    };
  };
  agencyInfo?: {
    agencyName: FormDataEntryValue | null;
    country: FormDataEntryValue | null;
    city: FormDataEntryValue | null;
    address: FormDataEntryValue | null;
    website: FormDataEntryValue | null;
    contactName: FormDataEntryValue | null;
    contactPhone: FormDataEntryValue | null;
    contactEmail: FormDataEntryValue | null;
    documents?: {
      businessLicense: { name: string; size: number; type: string } | null;
      companyLogo: { name: string; size: number; type: string } | null;
    };
  };
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const applicantType = formData.get("applicantType") as string;
    const degreeId = formData.get("degreeId") as string;
    const degreeName = formData.get("degreeName") as string;
    const facultyId = formData.get("facultyId") as string;
    const facultyName = formData.get("facultyName") as string;

    // Log received data for debugging
    console.log("📝 Application received:", {
      applicantType,
      degreeId,
      degreeName,
      facultyId,
      facultyName,
    });

    // Prepare data to send to your actual backend
    const applicationData: ApplicationData = {
      applicantType,
      degreeId: parseInt(degreeId),
      degreeName,
      facultyId: parseInt(facultyId),
      facultyName,
      submittedAt: new Date().toISOString(),
      ipAddress:
        request.headers.get("x-forwarded-for") ||
        request.headers.get("x-real-ip") ||
        "unknown",
      userAgent: request.headers.get("user-agent") || "unknown",
      locale: request.headers.get("accept-language")?.split(",")[0] || "en",
    };

    if (applicantType === "student") {
      applicationData.studentInfo = {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        gender: formData.get("gender"),
        dateOfBirth: formData.get("dateOfBirth"),
        placeOfBirth: formData.get("placeOfBirth"),
        nationality: formData.get("nationality"),
        nativeLanguage: formData.get("nativeLanguage"),
        phone: formData.get("phone"),
        email: formData.get("email"),
        country: formData.get("country"),
        city: formData.get("city"),
        addressLine: formData.get("addressLine"),
      };

      // Get uploaded files info
      const photoId = formData.get("photoId") as File;
      const profilePhoto = formData.get("profilePhoto") as File;
      const diploma = formData.get("diploma") as File;
      const transcript = formData.get("transcript") as File;

      applicationData.studentInfo.documents = {
        photoId: photoId
          ? { name: photoId.name, size: photoId.size, type: photoId.type }
          : null,
        profilePhoto: profilePhoto
          ? {
              name: profilePhoto.name,
              size: profilePhoto.size,
              type: profilePhoto.type,
            }
          : null,
        diploma: diploma
          ? { name: diploma.name, size: diploma.size, type: diploma.type }
          : null,
        transcript: transcript
          ? {
              name: transcript.name,
              size: transcript.size,
              type: transcript.type,
            }
          : null,
      };

      console.log("👨‍🎓 Student application:", applicationData.studentInfo);
    } else if (applicantType === "agency") {
      applicationData.agencyInfo = {
        agencyName: formData.get("agencyName"),
        country: formData.get("country"),
        city: formData.get("city"),
        address: formData.get("address"),
        website: formData.get("website"),
        contactName: formData.get("contactName"),
        contactPhone: formData.get("contactPhone"),
        contactEmail: formData.get("contactEmail"),
      };

      // Get uploaded files info
      const businessLicense = formData.get("businessLicense") as File;
      const companyLogo = formData.get("companyLogo") as File;

      applicationData.agencyInfo.documents = {
        businessLicense: businessLicense
          ? {
              name: businessLicense.name,
              size: businessLicense.size,
              type: businessLicense.type,
            }
          : null,
        companyLogo: companyLogo
          ? {
              name: companyLogo.name,
              size: companyLogo.size,
              type: companyLogo.type,
            }
          : null,
      };

      console.log("🏢 Agency application:", applicationData.agencyInfo);
    }

    // TODO: Here you would:
    // 1. Upload files to storage (S3, Cloudinary, etc.)
    // 2. Send data to your actual backend API
    // 3. Store in database

    // Example: Forward to your backend
    // const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/apply`, {
    //   method: "POST",
    //   body: formData, // or JSON.stringify(applicationData) depending on your backend
    // });

    // Simulate backend response
    const mockApplicationId = Math.floor(100000 + Math.random() * 900000);
    const referenceNumber = `APP-${mockApplicationId}`;

    return NextResponse.json(
      {
        status: true,
        message: "Application submitted successfully",
        data: {
          applicationId: mockApplicationId,
          referenceNumber,
          submittedAt: applicationData.submittedAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error processing application:", error);

    return NextResponse.json(
      {
        status: false,
        message: "Failed to submit application",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
