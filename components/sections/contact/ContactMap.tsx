"use client";

import { motion } from "framer-motion";
import { MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";

export default function ContactMap() {
  const t = useTranslations("contact.map");
  // Google Maps embed URL - Replace with your actual address coordinates
  // Format: https://www.google.com/maps/embed?pb=...
  // Or use: https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=YOUR_ADDRESS
  const mapEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.4286744962345!2d49.86755731535533!3d40.40926197936457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x403087462396e2bb%3A0x7e8f4cd321cc0a72!2sBaku%2C%20Azerbaijan!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s";

  const address = {
    full: "ul. Krakowska 23, 00-000 Warsaw, Poland",
    googleMapsUrl: "https://goo.gl/maps/...", // Replace with actual Google Maps URL
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: "-50px" }}
      className="h-full"
    >
      <Card className="shadow-lg h-full flex flex-col">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <MapPin className="w-6 h-6 text-primary" />
            {t("title")}
          </CardTitle>
          <p className="text-muted-foreground mt-2">{t("subtitle")}</p>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          {/* Map */}
          <div className="relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-4 border">
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
              title="EIPU Location Map"
            />
          </div>

          {/* Address Info */}
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">
                {t("campusAddress")}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {address.full}
              </p>
            </div>

            {/* Directions Button */}
            <Button asChild variant="outline" className="w-full">
              <a
                href={address.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                {t("getDirections")}
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
