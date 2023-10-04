import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";
import prismadb from '@/lib/prismadb';
import { without } from 'lodash';


export default async function hander(req: NextApiRequest, res: NextApiResponse) {
    try {


        if (req.method === 'POST') {

            const { currentUser, movieId } = await getExistingMovie(req);

            if (currentUser) {
                const user = await prismadb.user.update({
                    where: {
                        email: currentUser?.email || '',
                    },
                    data: {
                        favoriteIds: {
                            push: movieId
                        }
                    }
                })

                return res.status(200).json(user);
            }
        }

        if (req.method === 'DELETE') {
            const { currentUser, movieId } = await getExistingMovie(req);

            const updatedFavoriteMovies = without(currentUser?.favoriteIds, movieId);
            const updatedUser = await prismadb.user.update({
                where: {
                    email: currentUser?.email || ''
                },
                data: {
                    favoriteIds: updatedFavoriteMovies
                }
            })

            return res.status(200).json(updatedUser);
        }

        return res.status(405).end();
    } catch (error) {
        console.error('Error caught: ', error);
        return res.status(400).end();
    }
}

const getExistingMovie = async (req: NextApiRequest) => {
    const { currentUser } = await serverAuth(req);
    const { movieId } = req.body;

    const existingMovie = await prismadb.movie.findUnique({ where: { id: movieId } });

    if (!existingMovie) throw new Error('Movie not found');

    return { currentUser, movieId, existingMovie };
}
