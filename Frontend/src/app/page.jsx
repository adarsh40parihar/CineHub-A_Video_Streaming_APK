import BannerSection from "@/components/Section/BannerSection";
import CategoriesSection from "@/components/Section/CategoriesSection";
import JumperSection from "@/components/Section/JumperSection";

function Home() {
  const list = [
    {
      label: "Top Rated",
      href: "top-rated"
    },
    {
      label: "Popular",
      href: "popular"
    },
    {
      label: "Upcoming",
      href: "upcoming"
    }
  ];
  return (
    <>
      <JumperSection list={list}></JumperSection>
      <BannerSection></BannerSection>
          {/* // list of categories  */}
      {
        list.map((item) => (
          <CategoriesSection key={item.label} title={item.label} id={item.href}></CategoriesSection>
        ))
      }
    </>
  );
}
export default Home;
