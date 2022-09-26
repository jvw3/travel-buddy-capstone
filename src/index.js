import { TravelBuddy } from './components/travelbuddy'
import { createRoot } from "react-dom/client"

import "./index.css"
import { BrowserRouter } from "react-router-dom"
import { NotificationsProvider } from '@mantine/notifications'
// import reportWebVitals from './reportWebVitals';

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
        <NotificationsProvider position="bottom-center">
    <BrowserRouter>
        <TravelBuddy />
    </BrowserRouter>
        </NotificationsProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
