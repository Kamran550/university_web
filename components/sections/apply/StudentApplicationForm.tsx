"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";

interface StudentApplicationFormProps {
  facultyId: number;
  facultyName: string;
  degreeId: number;
  degreeName: string;
  onSubmitSuccess?: () => void;
}

export default function StudentApplicationForm({
  facultyId,
  facultyName,
  degreeId,
  degreeName,
  onSubmitSuccess,
}: StudentApplicationFormProps) {
  const t = useTranslations("apply.studentForm");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formSchema = z.object({
    firstName: z.string().min(1, t("required")),
    lastName: z.string().min(1, t("required")),
    fatherName: z.string().min(1, t("required")),
    gender: z.string().min(1, t("required")),
    dateOfBirth: z.string().min(1, t("required")),
    placeOfBirth: z.string().min(1, t("required")),
    nationality: z.string().min(1, t("required")),
    nativeLanguage: z.string().min(1, t("required")),
    phone: z.string().min(1, t("required")),
    email: z.string().email(t("invalidEmail")),
    photoId: z.any().refine((file) => file?.length > 0, t("required")),
    profilePhoto: z.any().optional(),
    country: z.string().min(1, t("required")),
    city: z.string().min(1, t("required")),
    addressLine: z.string().min(1, t("required")),
    diploma: z.any().optional(),
    transcript: z.any().refine((file) => file?.length > 0, t("required")),
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      fatherName: "",
      gender: "",
      dateOfBirth: "",
      placeOfBirth: "",
      nationality: "",
      nativeLanguage: "",
      phone: "",
      email: "",
      country: "",
      city: "",
      addressLine: "",
    },
  });

  async function onSubmit(data: FormValues) {
    try {
      const formData = new FormData();

      // Add form data with snake_case to match backend
      formData.append("degree_id", degreeId.toString());
      formData.append("faculty_id", facultyId.toString());
      formData.append("first_name", data.firstName);
      formData.append("last_name", data.lastName);
      formData.append("father_name", data.fatherName);
      formData.append("gender", data.gender);
      formData.append("date_of_birth", data.dateOfBirth);
      formData.append("place_of_birth", data.placeOfBirth);
      formData.append("nationality", data.nationality);
      formData.append("native_language", data.nativeLanguage);
      formData.append("phone", data.phone);
      formData.append("email", data.email);
      formData.append("country", data.country);
      formData.append("city", data.city);
      formData.append("address_line", data.addressLine);

      // Add files with _path suffix as backend expects
      if (data.photoId?.[0]) formData.append("photo_id_path", data.photoId[0]);
      if (data.profilePhoto?.[0])
        formData.append("profile_photo_path", data.profilePhoto[0]);
      if (data.diploma?.[0]) formData.append("diploma_path", data.diploma[0]);
      if (data.transcript?.[0])
        formData.append("transcript_path", data.transcript[0]);

      // Add locale (get from browser or Next.js)
      const locale = document.documentElement.lang || "en";
      formData.append("locale", locale);

      // Send directly to backend
      const backendUrl =
        process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";
      const response = await fetch(`${backendUrl}/applications/student`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("❌ Error response:", errorData);
        throw new Error(errorData.message || "Failed to submit application");
      }

      const result = await response.json();
      console.log("✅ Application submitted successfully:", result);

      setIsSubmitted(true);

      // Clear form and state after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        form.reset();
        onSubmitSuccess?.();
      }, 3000);
    } catch (error) {
      console.error("❌ Error submitting application:", error);
      alert(
        `Failed to submit application: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-bold">
            {t("title")}
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            {t("programChoice")}:{" "}
            <span className="font-semibold">{facultyName}</span>
          </p>
        </CardHeader>
        <CardContent>
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
            >
              <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-3" />
              <h3 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-2">
                {t("submitSuccess")}
              </h3>
            </motion.div>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                {/* Personal Information */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    {t("personalInfo")}
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("firstName")} *</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("lastName")} *</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="fatherName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("fatherName")} *</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("gender")} *</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="male">{t("male")}</SelectItem>
                              <SelectItem value="female">
                                {t("female")}
                              </SelectItem>
                              <SelectItem value="other">
                                {t("other")}
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="dateOfBirth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("dateOfBirth")} *</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="placeOfBirth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("placeOfBirth")} *</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="nationality"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("nationality")} *</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="nativeLanguage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("nativeLanguage")} *</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("phone")} *</FormLabel>
                          <FormControl>
                            <Input type="tel" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("email")} *</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Identification */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    {t("identification")}
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="photoId"
                      render={({
                        field: { value, onChange, ...fieldProps },
                      }) => (
                        <FormItem>
                          <FormLabel>{t("photoId")} *</FormLabel>
                          <FormControl>
                            <Input
                              {...fieldProps}
                              type="file"
                              accept="image/*,.pdf"
                              onChange={(e) => onChange(e.target.files)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="profilePhoto"
                      render={({
                        field: { value, onChange, ...fieldProps },
                      }) => (
                        <FormItem>
                          <FormLabel>{t("profilePhoto")}</FormLabel>
                          <FormControl>
                            <Input
                              {...fieldProps}
                              type="file"
                              accept="image/*"
                              onChange={(e) => onChange(e.target.files)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">{t("address")}</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("country")} *</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("city")} *</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="addressLine"
                      render={({ field }) => (
                        <FormItem className="sm:col-span-2">
                          <FormLabel>{t("addressLine")} *</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Education Documents */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    {t("educationDocuments")}
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="diploma"
                      render={({
                        field: { value, onChange, ...fieldProps },
                      }) => (
                        <FormItem>
                          <FormLabel>{t("diploma")}</FormLabel>
                          <FormControl>
                            <Input
                              {...fieldProps}
                              type="file"
                              accept=".jpg,.jpeg,.pdf"
                              onChange={(e) => onChange(e.target.files)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="transcript"
                      render={({
                        field: { value, onChange, ...fieldProps },
                      }) => (
                        <FormItem>
                          <FormLabel>{t("transcript")} *</FormLabel>
                          <FormControl>
                            <Input
                              {...fieldProps}
                              type="file"
                              accept=".jpg,.jpeg,.pdf"
                              onChange={(e) => onChange(e.target.files)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? t("submitting") : t("submit")}
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
