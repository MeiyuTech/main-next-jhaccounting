import { Metadata } from "next"
import UserForm from "@/components/user-form"

export const metadata: Metadata = {
    title: "User Information Form",
    description: "Submit your information",
}

export default function FormPage() {
    return (
        <div className="container mx-auto py-10">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">用户信息表单</h1>
                <UserForm />
            </div>
        </div>
    )
} 