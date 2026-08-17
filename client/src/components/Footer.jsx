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
    <footer
      className="theme-transition"
      style={{ background: "var(--footer-bg)", color: "var(--footer-text)" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        {/* Top */}
        <div className="py-16 flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-shrink-0 max-w-xs"
          >
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-extrabold text-lg"
                style={{
                  background:
                    "linear-gradient(135deg, var(--primary), var(--primary-dark))",
                }}
              >
                M
              </div>
              <span className="text-xl font-extrabold">Mingo ChatApp</span>
            </div>
            <p className="text-sm leading-relaxed mb-6 opacity-60">
              A fast, secure, and modern messaging experience for everyone. Stay
              connected, always.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{
                    scale: 1.15,
                    backgroundColor: "var(--primary)",
                  }}
                  className="w-9 h-9 rounded-xl flex items-center justify-center opacity-60 hover:opacity-100 transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.10)",
                    color: "var(--footer-text)",
                  }}
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
                <p className="text-xs font-bold uppercase tracking-widest mb-4 opacity-50">
                  {group.title}
                </p>
                <ul className="space-y-3">
                  {group.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm opacity-50 hover:opacity-100 transition-opacity duration-200 inline-block"
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
          <p className="text-sm opacity-40">
            © {new Date().getFullYear()} Mingo ChatApp. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm opacity-40 hover:opacity-80 transition-opacity duration-200"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
