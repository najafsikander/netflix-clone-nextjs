import { getSession } from "next-auth/react";
import { NextPageContext } from "next";
import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import MoviesList from "@/components/MoviesList";
import useMoviesList from "@/hooks/useMoviesList";
import useFavorites from "@/hooks/useFavorites";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) return { redirect: { destination: "/auth", permanent: false } };

  return {
    props: {},
  };
}

export default function Home() {
  const { data: movies = [] } = useMoviesList();
  const { data: favoriteMovies = [] } = useFavorites();

  return (
    <>
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MoviesList title="Trending Now" data={movies} />
        <MoviesList title="My List" data={favoriteMovies} />
      </div>
    </>
  );
}
