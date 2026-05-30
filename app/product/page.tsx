import ComingSoon from "@/components/ComingSoon";

export const metadata = {
  title: "FarmIQ — the Altiora ERP for agriculture",
  description: "FarmIQ is the agri version of the Altiora method. Detailed product anatomy coming soon.",
};

export default function ProductPage() {
  return (
    <ComingSoon
      pageName="FarmIQ"
      tagline="The agriculture ERP we built using the Altiora method. Detailed module anatomy coming soon — until then, see the Karakuta case study or book a call and we'll walk you through it live."
    />
  );
}
