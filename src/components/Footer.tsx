export const Footer = () => {
  const linkedInLink = import.meta.env.VITE_LINKEDIN_LINK;
  const githubLink = import.meta.env.VITE_GITHUB_LINK;


return (
  <div className="max-w-6xl px-4 pt-8 pb-20 mx-auto  bg:white dark:bg-black">
      <div className="relative w-full  bg-black dark:bg-white rounded-2xl">
          <div className="max-w-7xl mx-auto px-6 py-8 md:py-12">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4">
                  <div className="col-span-1 md:col-span-5">
                      <a className="text-xl font-bold text-white dark:text-black cursor-pointer"
                      onClick={(e) => {
                          e.preventDefault();
                          document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
                        }}
                      >Ace Mock</a>
                      <p className="max-w-sm text-sm text-neutral-400 dark:text-neutral-800 mt-4 mb-6 ">Transform your  professional career with AI-powered interview.</p>

                      <div className="flex items-center gap-4">
                          <a className="p-2 rounded-lg transition-colors duration-100 hover:bg-white/10 dark:hover:bg-black/10 text-white/70 dark:text-black/70 hover:text-white dark:hover:text-black" href="https://twitter.com">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter w-5 h-5"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                          </a>
                          <a className="p-2 rounded-lg transition-colors duration-200 hover:bg-white/10 dark:hover:bg-black/10 text-white/70 dark:text-black/70 hover:text-white dark:hover:text-black" href={githubLink}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github w-5 h-5"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                          </a>
                          <a className="p-2 rounded-lg transition-colors duration-200 hover:bg-white/10 dark:hover:bg-black/10 text-white/70 dark:text-black/70 hover:text-white dark:hover:text-black" href={linkedInLink}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucideLinkedin w-5 h-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                          </a>
                          <span className="text-sm text-white/50 dark:text-black/50 ml-1">© 2025</span></div>
                      </div>
                      <div className="flex flex-col col-span-1 md:col-span-2 items-start md:items-end">
                          <p className="font-medium text-white dark:text-black mb-3">Product</p>
                          <ul className="space-y-2 w-full md:text-right">
                              <li>
                                  <a className="text-sm text-neutral-300 dark:text-neutral-700 hover:text-white dark:hover:text-black transition-colors duration-200" href="#features"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
                                    }}>Features
                                  </a>
                              </li>
                              <li>
                                  <a className="text-sm text-neutral-300 dark:text-neutral-700 hover:text-white dark:hover:text-black transition-colors duration-200" href="#pricing"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
                                    }}>Pricing
                                  </a>
                              </li>
                              <li>
                                  <a className="text-sm text-neutral-300 dark:text-neutral-700 hover:text-white dark:hover:text-black transition-colors duration-200" href="#faq"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" });
                                    }}>FAQ
                                  </a>
                              </li>
                          </ul>
                      </div>
                      <div className="flex flex-col col-span-1 md:col-span-2 items-start md:items-end">
                          <p className="font-medium text-white dark:text-black mb-3">Company</p>
                          <ul className="space-y-2 w-full md:text-right">
                              <li>
                                  <a className="text-sm text-neutral-300 dark:text-neutral-700 hover:text-white dark:hover:text-black transition-colors duration-200" href="#about">About
                                  </a>
                              </li>
                              <li>
                                  <a className="text-sm text-neutral-300 dark:text-neutral-700 hover:text-white dark:hover:text-black transition-colors duration-200" href="#blog">Blog
                                  </a>
                              </li>
                              <li>
                                  <a className="text-sm text-neutral-300 dark:text-neutral-700 hover:text-white dark:hover:text-black transition-colors duration-200" href="#careers">Careers
                                  </a>
                              </li>
                          </ul>
                      </div>
                      <div className="flex flex-col col-span-1 md:col-span-2 items-start md:items-end">
                          <p className="font-medium text-white dark:text-black mb-3">Legal</p>
                          <ul className="space-y-2 w-full md:text-right">
                              <li>
                                  <a className="text-sm text-neutral-300 dark:text-neutral-700 hover:text-white dark:hover:text-black transition-colors duration-200" href="#privacy">Privacy
                                  </a>
                              </li>
                              <li>
                                  <a className="text-sm text-neutral-300 dark:text-neutral-700 hover:text-white dark:hover:text-black transition-colors duration-200" href="#terms">Terms
                                  </a>
                              </li>
                              <li>
                                  <a className="text-sm text-neutral-300 dark:text-neutral-700 hover:text-white dark:hover:text-black transition-colors duration-200" href="#security">Security
                                  </a>
                              </li>
                          </ul>
                      </div>
              </div>
          </div>
      </div>
  </div>
)
}