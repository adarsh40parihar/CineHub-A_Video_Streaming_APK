import BannerSection from "@/components/Section/BannerSection";
import CategoriesSection from "@/components/Section/CategoriesSection";
import JumperSection from "@/components/Section/JumperSection";
import {ENDPOINT, api } from "@/lib/api_endpoints";

function Home() {
  const list = [
    {
      label: "Top Rated",
      href: "top-rated",
      fetcher: async function () {
        const res = await api.get(ENDPOINT.discoverTopRated);
        const data = res?.data?.response?.results;
        return data;
      },
    },
    {
      label: "Popular",
      href: "popular",
      fetcher: async function () {
        const res = await api.get(ENDPOINT.discoverTrending);
        const data = res?.data?.response?.results;
        return data;
      },
    },
    {
      label: "Upcoming",
      href: "upcoming",
      fetcher: async function () {
        const res = await api.get(ENDPOINT.discoverUpcoming);
        const data = res?.data?.response?.results;
        return data;
      },
    },
  ];
  async function getHomeBannerData() {
    const res = await api.get(ENDPOINT.discoverNowPlaying);
    const data = res?.data?.response?.results;
    return data;
  }
  return (
    <>
      <JumperSection list={list}></JumperSection>
      <BannerSection fetcher={getHomeBannerData}></BannerSection>
      {/* // list of categories  */}
      {list.map((item) => (
        <CategoriesSection
          key={item.label}
          title={item.label}
          id={item.href}
          fetcher={item.fetcher}
        ></CategoriesSection>
      ))}
    </>
  );
}
export default Home;
