import React from "react";
import { motion } from "motion/react";
import { FiTwitter, FiInstagram, FiGithub, FiYoutube } from "react-icons/fi";

const footerLinks = [
  {
    title: "Product",
    links: ["Features", "Download", "Security", "What's New"],
  },
  {
    title: "Company",
    links: ["About Us", "Blog", "Careers", "Press"],
  },
  {
    title: "Support",
    links: ["Help Center", "Privacy Policy", "Terms of Service", "Contact"],
  },
  {
    title: "Business",
    links: ["Mingo Business", "API Access", "Partners", "For Enterprise"],
  },
];

const socialLinks = [
  { Icon: FiTwitter, label: "Twitter", href: "#" },
  { Icon: FiInstagram, label: "Instagram", href: "#" },
  { Icon: FiGithub, label: "GitHub", href: "#" },
  { Icon: FiYoutube, label: "YouTube", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-[#111827] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        {/* Top section */}
        <div className="py-16 flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-shrink-0 max-w-xs"
          >
            {/* Logo */}
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-extrabold text-lg"
                style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}
              >
                M
              </div>
              <span className="text-xl font-extrabold text-white">Mingo ChatApp</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              A fast, secure, and modern messaging experience for everyone. Stay connected, always.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ scale: 1.15, backgroundColor: "#25D366" }}
                  className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links grid */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-8">
            {footerLinks.map((group, gi) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: gi * 0.08 }}
              >
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">{group.title}</p>
                <ul className="space-y-3">
                  {group.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-gray-400 text-sm hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10" />

        {/* Bottom bar */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Mingo ChatApp. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <a key={item} href="#" className="text-gray-500 text-sm hover:text-white transition-colors duration-200">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
