import BannerSection from "@/components/Section/BannerSection";
import CategoriesSection from "@/components/Section/CategoriesSection";
import JumperSection from "@/components/Section/JumperSection";
import { ENDPOINT, api } from "@/lib/api_endpoints";

export default function Home() {
  const list = [
    {
      label: "Comedy",
      href: "comedy",
      fetcher: async () => {
        return (await api.get(ENDPOINT.fetchComedyMovies)).data.response
          ?.results;
      },
    },
    {
      label: "Horror",
      href: "horror",
      fetcher: async () => {
        return (await api.get(ENDPOINT.fetchHorrorMovies)).data.response
          ?.results;
      },
    },
    {
      label: "Romance",
      href: "romance",
      fetcher: async () => {
        return (await api.get(ENDPOINT.fetchRomanceMovies)).data.response
          ?.results;
      },
    },
    {
      label: "Action",
      href: "action",
      fetcher: async () => {
        return (await api.get(ENDPOINT.fetchActionMovies)).data.response
          ?.results;
      },
    },
  ];
  const getMoviesBannerData = async () => {
    return (await api.get(ENDPOINT.fetchAnimeMovies)).data?.response?.results;
  };

  return (
    <>
      <JumperSection list={list} />
      <BannerSection fetcher={getMoviesBannerData} />
      {/* // list of categories  */}
      {list.map((item) => {
        return (
          <CategoriesSection
            key={item.label}
            title={item.label}
            id={item.href}
            fetcher={item.fetcher}
          />
        );
      })}
    </>
  );
}
