import { SlMenu } from "react-icons/sl";
import { IoClose } from "react-icons/io5";
import propTypes from "prop-types";
import { motion } from "framer-motion";
import { isMobile } from 'react-device-detect';

const Header = ({ buka, toggleSidebar, title }) => {
     return (
          <header
               className={`bg-[#808080] fixed top-0 left-0 p-4 flex justify-between items-center w-full border-b border-b-zinc-200 z-10`}>
               <motion.div
                    animate={{ marginLeft: buka ? isMobile ? '10rem' : `17.5rem`  : "2.25rem" }}
                    transition={{ duration: 0.5 }}>
                    <div className="flex items-center">
                         <motion.button
                              onClick={toggleSidebar}
                              className="toggle-btn ml-20"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}>
                              {buka ? (
                                   <motion.div
                                        key="close"
                                        initial={{ rotate: 90 }}
                                        animate={{ rotate: 0 }}
                                        transition={{ duration: 0.5 }}>
                                        <IoClose
                                             size={30}
                                             className="text-white"
                                        />
                                   </motion.div>
                              ) : (
                                   <motion.div
                                        key="menu"
                                        initial={{ rotate: -90 }}
                                        animate={{ rotate: 0 }}
                                        transition={{ duration: 0.5 }}>
                                        <SlMenu
                                             size={30}
                                             className="text-white"
                                        />
                                   </motion.div>
                              )}
                         </motion.button>
                         <div className="text-[28px] font-bold ps-3 text-white overflow-y-hidden">
                              {title}
                         </div>
                    </div>
               </motion.div>
          </header>
     );
};

Header.propTypes = {
     buka: propTypes.bool.isRequired,
     toggleSidebar: propTypes.func.isRequired,
     title: propTypes.string.isRequired,
};

export default Header;
