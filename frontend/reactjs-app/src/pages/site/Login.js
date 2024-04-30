// import React, { useState } from 'react';
// import styles from '../../assets/styles/navbar.module.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFacebookF, faGoogle, faTiktok } from '@fortawesome/free-brands-svg-icons'; // Correct import path
// import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

// // Change the import source to free-brands-svg-icons

// // Now you can use the faFacebookF icon in your component



// const Login = () => {
//   const [isRightPanelActive, setIsRightPanelActive] = useState(false);
//   const [registerFormData, setRegisterFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//   });
//   const [loginFormData, setLoginFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const handleRegisterClick = () => {
//     setIsRightPanelActive(true);
//   };

//   const handleLoginClick = () => {
//     setIsRightPanelActive(false);
//   };

//   const handleRegisterChange = (e) => {
//     const { id, value } = e.target;
//     setRegisterFormData({ ...registerFormData, [id]: value });
//   };

// const handleLoginChange = (e) => {
//   const { name, value } = e.target;  // Use name instead of className
//   setLoginFormData({ ...loginFormData, [name]: value });  // Ensure inputs have a name attribute
// };


//   const handleRegisterSubmit = (e) => {
//     e.preventDefault();
//     // Your registration form submission logic here
//   };

//   const handleLoginSubmit = (e) => {
//     e.preventDefault();
//     // Your login form submission logic here
//   };

//   return (
//     <div className={styles.backroundlogin}>
//         <div className={`${styles.container} ${isRightPanelActive ? styles['right-panel-active'] : ''}`}>
//       <div className={`${styles['form-container']} ${styles['register-container']}`}>
//         <form className={styles.formlogin} onSubmit={handleRegisterSubmit}>
//           <h1 className={styles.h1login}>Register here</h1>
//           <div className={`${styles[`form-control`]}`}>
//             <input className={styles.inputlongin} type="text" id="username" placeholder="Name" value={registerFormData.username} onChange={handleRegisterChange} />
//             <small id="username-error"></small>
//             <span></span>
//           </div>
//           <div className={`${styles[`form-control`]}`}>
//             <input  className={styles.inputlongin} type="email" id="email" placeholder="Email" value={registerFormData.email} onChange={handleRegisterChange} />
//             <small id="email-error"></small>
//             <span></span>
//           </div>
//           <div className={`${styles[`form-control`]}`}>
//             <input className={styles.inputlongin} type="password" id="password" placeholder="Password" value={registerFormData.password} onChange={handleRegisterChange} />
//             <small id="password-error"></small>
//             <span></span>
//           </div>
        
//           <button className={styles.buttonlogin} type="submit">Register</button>
//           <span>or use your account</span>
//           <div className={`${styles[`social-container`]}`}>
//           <a href="#" className={`${styles.social}`}><FontAwesomeIcon icon={faFacebookF} /></a>
//             <a href="#" className={`${styles.social}`}><FontAwesomeIcon icon={faGoogle} /></a>
//             <a href="#" className={`${styles.social}`}><FontAwesomeIcon icon={faTiktok} /></a>
//           </div>
//         </form>
//       </div>

//       <div className={`${styles['form-container']} ${styles['login-container']}`}>
//         <form className={`${styles[`form-lg`]} ${styles.formlogin}`}  onSubmit={handleLoginSubmit}>
//           <h1 className={styles.h1login}>Login here.</h1>
//           <div className={`${styles[`form-control2`]}`}> 
//             <input className={styles.inputlongin} type="email" name="email" placeholder="Email" value={loginFormData.email} onChange={handleLoginChange} />
//             <small className="email-error-2"></small>
//             <span></span>
//           </div>
//            <div className={`${styles[`form-control2`]}`}>
//             <input  className={styles.inputlongin} type="password" name="password"  placeholder="Password" value={loginFormData.password} onChange={handleLoginChange} />
//             <small className="password-error-2"></small>
//             <span></span>
//           </div>
//           <div className={`${styles[`content`]}`}>
//             <div className={`${styles[`checkbox`]}`}>
//               <input  className={styles.inputlongin}type="checkbox" name="checkbox" id="checkbox" />
//               <label htmlFor="">Remember me</label>
//             </div>
//             <div className={`${styles[`pass-link`]}`}>
//               <a href="#">Forgot password</a>
//             </div>
//           </div>
//           <button  className={styles.buttonlogin} type="submit">Login</button>
//           <span>Or use your account</span>
//           <div className={`${styles[`social-container`]}`}>
//             <a href="#" className={`${styles.social}`}><FontAwesomeIcon icon={faFacebookF} /></a>
//             <a href="#" className={`${styles.social}`}><FontAwesomeIcon icon={faGoogle} /></a>
//             <a href="#" className={`${styles.social}`}><FontAwesomeIcon icon={faTiktok} /></a>
//           </div>
//         </form>
//       </div>

//       <div className={`${styles[`overlay-container`]}`}>
//         <div className={`${styles[`overlay`]}`}>
//           <div className={`${styles['overlay-panel']} ${styles['overlay-left']}`}>
//             <h1 className={`${styles[`title`]}`}>Hello<br />friends</h1>
//             <p className={styles.plogin}>If you have an account, login here and have fun</p>
//             <button className={`${styles[`ghost`]} ${styles['buttonlogin']}`}  id="login" onClick={handleLoginClick}>Login <FontAwesomeIcon icon={faArrowLeft} /></button>
//           </div>
//           <div className={`${styles['overlay-panel']} ${styles['overlay-right']}`}>
//             <h1 className={`${styles[`title`]}`}>Start your<br />journey now</h1>
//             <p className={styles.plogin}>If you don't have an account yet, join us and start your journey</p>
//             <button className={`${styles[`ghost`]} ${styles['buttonlogin']}`} id="register" onClick={handleRegisterClick}>Register <FontAwesomeIcon icon={faArrowRight} /></button>
//           </div>
//         </div>
//       </div>
//     </div>
//     </div>
    
//   );
// };

// export default Login;
