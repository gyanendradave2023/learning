import Input from '../ui/Input';
import Button from '../ui/Button';

const LoginPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-8 text-center">Login</h2>
            <form>
            <Input
            type="text"
            placeholder="Username"           
            className="mb-4"
            required
          />
          <Input
            type="password"
            placeholder="Password"           
            className="mb-4"
            required
          />
          <Button type="submit" className="w-full">
            Login
          </Button>
            </form>
          </div>
        </div>
      );
}
export default LoginPage;