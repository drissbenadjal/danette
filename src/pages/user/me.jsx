import { AuthContext } from "@/context/AuthContext"
import { useContext, useEffect } from "react"
import { useRouter } from "next/router"
import Leaderboard from "@/components/Leaderboard/Leaderboard"

const Me = () => {
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
                user && <>
                    <main className="profile_main">
                        <div>
                            <h1>My profile</h1>
                            <h4>{user.user_pseudo}</h4>
                            <h4>{user.user_email}</h4>
                            <br />
                            <h3>My score : {user.score}</h3>

                        </div>
                        <Leaderboard />
                    </main>
                </>
            }
        </>
    )
}

export default Me