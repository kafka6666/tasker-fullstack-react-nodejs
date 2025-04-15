import { useState } from "react";
import { Button } from "./ui/button";
import { apiClient } from "../service/apiClient";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";

const SignUp = () => {
    const [ userName, setUserName ] = useState<string>('');
    const [ email, setEmail ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ error, setError ] = useState<string>('');
    const navigate = useNavigate();
    
    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
    
        try {
            // Make ap API call to backend
            const response = await apiClient.signUp(userName, email, password);
            console.log(response);

            // Redirect to login page
            if (response?.data?.success) {
                navigate('/sign-in');
            } else {
                setError(response?.data?.message || "Failed to register user");
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error("Error registering user:", error.response?.data);
                setError(error.response?.data.message || "Failed to register user");
            }
        } finally {
            setIsLoading(false);
            setUserName('');
            setEmail('');
            setPassword('');
        }
    }
    
    return (
      <div className="">
          <h1>Welcome to Sign Up Page</h1>
          <p>Sign up to your account</p>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label 
                        htmlFor="username"
                    >
                        User Name
                    </label>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label 
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-300 rounded-md p-2"
                    required
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label 
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <Button 
                    className="w-full"
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? 'Signing Up...' : 'Sign Up'}
                </Button>
                {error && <p className="text-red-500 text-2xl">{error}</p>}
            </div>
          </form>
      </div>
    )
  }
  
  export default SignUp;