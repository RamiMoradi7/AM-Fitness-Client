import { useLocation, useNavigate } from "react-router-dom"
import logo from "../../Assets/Images/section.jpg"

type DashboardHeaderProps = {
    sidebarOpen: boolean
    toggleSidebar: () => void
}

export default function DashboardHeader({ sidebarOpen, toggleSidebar }: DashboardHeaderProps): JSX.Element {
    const navigate = useNavigate();

    return (
        <nav className="bg-white border-b border-gray-200 fixed mt-2 z-30 w-full transition-transform duration-300 ease-in-out">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <button
                            id="toggleSidebarMobile"
                            aria-expanded={sidebarOpen}
                            aria-controls="sidebar"
                            onClick={toggleSidebar}
                            className=" mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded transition-transform duration-300"
                        >
                            {sidebarOpen ? (
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                                </svg>
                            )}
                        </button>
                        <div className="text-xl font-bold flex items-center lg:ml-2.5">
                            <img src={logo} className="h-10 w-10 rounded-full mr-2" alt="AM Fitness Logo" /> /
                            <span className="self-center whitespace-nowrap">ממשק משתמשים</span>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <button id="toggleSidebarMobileSearch" type="button" className="lg:hidden text-gray-500 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg">
                            <span className="sr-only">Search</span>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                            </svg>
                        </button>
                    </div>
                    <button onClick={() => navigate(-1)}>חזרה</button>
                </div>
            </div>
        </nav>)
}