import { AuthContext } from "@/context/AuthContext"
import { useContext, useEffect } from "react"
import { useRouter } from "next/router"

const Profile = () => {
    const router = useRouter();
    const { user, loggedIn, isLoading } = useContext(AuthContext);
    useEffect(() => {
        if (isLoading) return;
        if (!loggedIn) {
            router.push('/login');
            return;
        };
    }, [isLoading, loggedIn]);
    return (
        <>
            {
                user && <div>
                    <h1>{user.user_pseudo}</h1>
                    <h1>{user.user_email}</h1>
                    <h1>{user.score}</h1>
                </div>
            }
        </>
    )
}

export default Profile