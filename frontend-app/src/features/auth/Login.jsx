function Login() {
  return (
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4 w-1/3 mx-auto shadow-2xl shadow-blue-300 mt-40">
      <h1 className="text-center text-2xl">SunShine</h1>

      <div className="w-3/4 mx-auto relative">
        <label className="label">Email</label>
        <input type="email" className="input w-full" placeholder="Email" />
      </div>

      <div className="w-3/4 mx-auto relative">
        <label className="label">Password</label>
        <input
          type="password"
          className="input w-full"
          placeholder="Password"
        />

        <div className="grid grid-cols-2 gap-2 mt-4">
          <label className="label mt-2 text-xl">
            <input
              type="checkbox"
              defaultChecked
              className="checkbox checkbox-primary"
            />
            Remember me
          </label>

          <button className="btn btn-link">Forget Password</button>
        </div>
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-soft btn-primary mx-2 my-2">Sign Up</button>
        <button className="btn btn-soft btn-secondary mx-2 my-2">Login</button>
      </div>
    </fieldset>
  );
}
export default Login;
