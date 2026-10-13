import { site } from "@lib/site";

export type EnquiryService = "photography" | "video";

const serviceMessages: Record<EnquiryService, string> = {
  photography: `Hi Ash, I’d like to check your availability for photography.\n\nDate:\nVenue:\nEvent or shoot type:\nCoverage hours:\nRequirements:`,
  video: `Hi Ash, I’d like to check your availability for event video coverage.\n\nDate:\nVenue:\nCoverage hours:\nIntended use:\nVideo requirements:`
};

export const getWhatsAppUrl = (service?: EnquiryService): string => {
  if (!service) return site.whatsappUrl;

  const phone = site.whatsapp.replace(/\D/g, "");
  const text = encodeURIComponent(serviceMessages[service]);
  return `https://api.whatsapp.com/send/?phone=${phone}&text=${text}&type=phone_number&app_absent=0`;
};

export const getBriefUrl = (service?: EnquiryService): string =>
  service ? `/contact/?service=${service}` : "/contact/";
