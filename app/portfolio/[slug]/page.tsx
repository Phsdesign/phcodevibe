import { portfolioData } from "@/data/portfolioData";
import ProjectClient from "./ProjectClient";

export const dynamicParams = false;

export function generateStaticParams() {
  return portfolioData.map((project) => ({
    slug: project.slug,
  }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <ProjectClient slug={slug} />;
}
