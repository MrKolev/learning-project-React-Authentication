import { Route, Routes,  } from "react-router-dom";
import { HomePage } from "./pages/Home";
import { EditEventPage } from "./pages/EditEvent";
import { RootLayout } from "./pages/Root";
import { EventsRootLayout } from "./pages/EventsRoot";
import { ErrorBoundary } from "react-error-boundary";
import { EventsList } from "./components/EventsList";
import { EventItemDetails } from "./components/EventItem";
import { EventForm } from "./components/EventForm";
import { NewsletterPage } from "./components/Newsletter";
import { AuthForm } from "./components/AuthForm";
import { RouteProtection } from "./components/RouteProtection";

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/*"
         element={<RootLayout />}>
          <Route index={true} element={<HomePage />} />
          <Route path="newsletter" element={<NewsletterPage />} />
          <Route path="auth" element={<AuthForm />} />
          <Route path="events/*" element={<EventsRootLayout />}>
            <Route index={true} element={<EventsList />} />
            <Route path=":id/*">
              <Route index={true} element={<EventItemDetails />} />
              <Route path="edit" element={<EditEventPage />} />
            </Route>
            <Route element={<RouteProtection isAuth />}>
            <Route path="new" element={<EventForm />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </ErrorBoundary>
  )
}

export default App;
