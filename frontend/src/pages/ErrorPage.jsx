import { useRouteError } from "react-router-dom"
import { PageContent } from "../components/PageContent"
import MainNavigation from "../components/MainNavigation";

export const ErrorPage = () => {
    const error = useRouteError();

    let title = "An error occurred";
    let message = "Something happened!!!";

    if (error.status === 500) {
        message = error.data.message
    }
    if (error.status === 404) {
        title = "Not Found";
        message = "Could not find the page"
    }

    return <>
        <MainNavigation />
        <PageContent title={title}>
            <p>{message}</p>
        </PageContent>
   </>
}