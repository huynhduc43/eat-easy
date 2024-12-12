export default function LoginPage() {
  return (
    <div className="flex h-screen items-center justify-center overflow-hidden">
      <div className="w-full max-w-md space-y-4 p-4">
        <h1 className="text-center text-2xl font-bold">{'Login'}</h1>
        <form>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block">
                {'Email'}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full rounded-md border border-gray-300 p-2"
              />
            </div>
            <div>
              <label htmlFor="password" className="block">
                {'Password'}
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full rounded-md border border-gray-300 p-2"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full rounded-md bg-blue-500 p-2 text-white"
              >
                {'Login'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
