import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/admin/login', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const token = response.data.token;
      localStorage.setItem('admin_token', token);
      navigate('/admin/dashboard');
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <LoginContainer>
      <Logo> {/* Placeholder for your company logo */}
        <img src="/public/img/LOGO.JPG" alt="Company Logo" />
      </Logo>
      <LoginForm onSubmit={handleSubmit}>
        <Title>Admin Login</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <InputGroup>
          <Label>Username</Label>
          <Input
            type="text"
            name="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </InputGroup>
        <InputGroup>
          <Label>Password</Label>
          <PasswordWrapper>
            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <ToggleVisibilityButton onClick={togglePasswordVisibility}>
              {showPassword ? '🙈' : '👁️'}
            </ToggleVisibilityButton>
          </PasswordWrapper>
        </InputGroup>
        <LoginButton type="submit">Login</LoginButton>
      </LoginForm>
      <Footer>
        <FooterLink href="/forgot-password">Forgot Password?</FooterLink>
        <FooterLink href="/contact-support">Contact Support</FooterLink>
      </Footer>
    </LoginContainer>
  );
};

// Styled Components
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to right, #f5f5f5, #e0e0e0);
`;

const Logo = styled.div`
  margin-bottom: 20px;

  img {
    width: 100px;
    height: auto;
  }
`;

const LoginForm = styled.form`
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
  text-align: left;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 16px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  transition: all 0.2s ease-in-out;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const PasswordWrapper = styled.div`
  position: relative;
`;

const ToggleVisibilityButton = styled.button`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-bottom: 10px;
`;

const Footer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FooterLink = styled.a`
  margin-top: 10px;
  text-decoration: none;
  color: #007bff;

  &:hover {
    text-decoration: underline;
  }
`;

export default AdminLogin;



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import styled from 'styled-components';

// const AdminLogin = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: ''
//   });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:5000/api/admin/login', formData, {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });

//       const token = response.data.token;
//       localStorage.setItem('admin_token', token);  // Store the JWT token
//       navigate('/admin/dashboard');  // Redirect to admin dashboard
//     } catch (error) {
//       setError('Invalid username or password');
//     }
//   };

//   return (
//     <LoginContainer>
//       <LoginForm onSubmit={handleSubmit}>
//         <Title>Admin Login</Title>
//         {error && <ErrorMessage>{error}</ErrorMessage>}
//         <InputGroup>
//           <Label>Username</Label>
//           <Input
//             type="text"
//             name="username"
//             value={formData.username}
//             onChange={handleChange}
//             required
//           />
//         </InputGroup>
//         <InputGroup>
//           <Label>Password</Label>
//           <Input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </InputGroup>
//         <LoginButton type="submit">Login</LoginButton>
//       </LoginForm>
//     </LoginContainer>
//   );
// };

// // Styled components for login form
// const LoginContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
//   background-color: #f5f5f5;
// `;

// const LoginForm = styled.form`
//   background-color: white;
//   padding: 40px;
//   border-radius: 10px;
//   box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
//   width: 100%;
//   max-width: 400px;
// `;

// const Title = styled.h2`
//   text-align: center;
//   margin-bottom: 20px;
//   font-size: 24px;
// `;

// const InputGroup = styled.div`
//   margin-bottom: 20px;
// `;

// const Label = styled.label`
//   display: block;
//   margin-bottom: 8px;
//   font-size: 16px;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 10px;
//   font-size: 16px;
//   border-radius: 5px;
//   border: 1px solid #ccc;
//   box-sizing: border-box;
//   transition: all 0.2s ease-in-out;

//   &:focus {
//     border-color: #007bff;
//     outline: none;
//   }
// `;

// const LoginButton = styled.button`
//   width: 100%;
//   padding: 10px;
//   background-color: #007bff;
//   color: white;
//   font-size: 16px;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   transition: background-color 0.2s ease-in-out;

//   &:hover {
//     background-color: #0056b3;
//   }
// `;

// const ErrorMessage = styled.p`
//   color: red;
//   text-align: center;
// `;

// export default AdminLogin;



// // import React, { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import axios from 'axios';

// // function AdminLogin() {
// //   const [formData, setFormData] = useState({
// //     username: '',
// //     password: ''
// //   });
// //   const [error, setError] = useState('');
// //   const navigate = useNavigate();

// //   const handleChange = (e) => {
// //     setFormData({
// //       ...formData,
// //       [e.target.name]: e.target.value
// //     });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     try {
// //       const response = await axios.post('http://localhost:5000/api/admin/login', formData, {
// //         headers: {
// //           'Content-Type': 'application/json'  // Ensure content type is set
// //         }
// //       });

// //       const token = response.data.token;
// //       localStorage.setItem('admin_token', token);  // Store the JWT token
// //       navigate('/admin/dashboard');  // Redirect to admin dashboard
// //     } catch (error) {
// //       setError('Invalid username or password');  // Handle login error
// //     }
// //   };

// //   return (
// //     <div className="admin-login">
// //       <h2>Admin Login</h2>
// //       {error && <p style={{ color: 'red' }}>{error}</p>}
// //       <form onSubmit={handleSubmit}>
// //         <div>
// //           <label>Username</label>
// //           <input
// //             type="text"
// //             name="username"
// //             value={formData.username}
// //             onChange={handleChange}
// //             required
// //           />
// //         </div>
// //         <div>
// //           <label>Password</label>
// //           <input
// //             type="password"
// //             name="password"
// //             value={formData.password}
// //             onChange={handleChange}
// //             required
// //           />
// //         </div>
// //         <button type="submit">Login</button>
// //       </form>
// //     </div>
// //   );
// // }

// // export default AdminLogin;
