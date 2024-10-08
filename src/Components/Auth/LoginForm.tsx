import { useForm } from "react-hook-form"
import { Credentials } from "../../Models/Credentials"
import { authService } from "../../Services/AuthService"
import { appStore } from "../../Redux/Store"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import Input from "./Input"
import { useState } from "react"

export default function LoginForm(): JSX.Element {
    const { handleSubmit, reset, control, formState: { isSubmitting }, getValues } = useForm<Credentials>()
    const navigate = useNavigate()
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);

    const login = async (credentials: Credentials) => {
        try {
            await authService.login(credentials)
            const userName = appStore.getState().auth.user.firstName
            toast.success(`ברוך שובך ${userName} !`)
            reset()
            navigate("/")
        } catch (err: any) {
            const errMessage = err.response?.data || "Some error accoured."
            toast.error(errMessage)

        }
    }

    const requestResetPassword = async () => {
        try {
            const email = getValues("email").toLowerCase()
            if (!email) {
                toast.error("הכנס את האימייל שלך קודם.")
                return
            }
            await authService.resetPasswordRequest(email)
            toast.success("ברגעים אלו נשלח אליך אימייל עם לינק לאיפוס הסיסמא.")
        } catch (err: any) {
            const errMessage = err.response?.data || "Cannot Request Resest Password."
            toast.error(errMessage)

        }
    }

    return (
        <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8" id="login">
            <div className="w-full px-8 md:px-32 lg:px-24">
                <form onSubmit={handleSubmit(login)} className="bg-white rounded-md shadow-2xl p-5">
                    <h1 className="text-gray-800 font-bold text-2xl mb-1">התחברות </h1>
                    <p className="text-sm font-normal text-gray-600 mb-8">ברוך שובך !</p>
                    <Input control={control} name="email" type="email" placeholder="אימייל" icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                    } />
                    <div className="relative mb-4">
                        <Input
                            control={control}
                            name="password"
                            type={isPasswordHidden ? "password" : "text"}
                            placeholder="סיסמא"

                        />
                        <svg
                            onClick={() => setIsPasswordHidden(!isPasswordHidden)}
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute inset-y-0 top-3 left-3 h-5 w-5 text-gray-400 hover:text-green-500 transition duration-200 cursor-pointer"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            {isPasswordHidden ? (
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            ) : (
                                <path fillRule="evenodd" d="M3.75 12a10.125 10.125 0 0118.25 0A10.125 10.125 0 013.75 12zm10.125 0a2.625 2.625 0 100-5.25 2.625 2.625 0 000 5.25z" />
                            )}
                        </svg>
                    </div>
                    <button type="submit" className="block w-full bg-green-600 mt-5 py-2 rounded-2xl hover:bg-green-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">{isSubmitting ? "מתחבר..." : "התחבר"}</button>
                    <div className="flex justify-between mt-4">
                        <span onClick={requestResetPassword} className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">שכחת סיסמא ? לחץ לאיפוס</span>
                    </div>

                </form>
            </div>

        </div>)
}