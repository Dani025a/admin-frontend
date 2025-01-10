import Header from '../../components/login/header/header';
import Form from '../../components/login/form/form';
import './login.css'

function Login() {
  return (
    <div className="login-page">
      <Header />
      <main className="login-main">
        <Form />
      </main>
    </div>
  );
}
  
  export default Login;