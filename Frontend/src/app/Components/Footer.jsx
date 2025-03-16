import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import GooglePlay from "@/../public/googlePlay.svg";
import AppleStore from "@/../public/appleStore.svg";
import JioLogo from "@/../public/jio-logo.png";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-5">
      <div className="max-w-screen-2xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* JioCinema Navigation */}
          <div>
            <h3 className="text-xl font-bold mb-6 ">JioCinema</h3>
            <ul className="space-y-3 font-bold">
              <li>
                <Link
                  href="/for-you"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  For You
                </Link>
              </li>
              <li>
                <Link
                  href="/sports"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Sports
                </Link>
              </li>
              <li>
                <Link
                  href="/movies"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Movies
                </Link>
              </li>
              <li>
                <Link
                  href="/tv"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  TV Shows
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xl font-bold mb-6">Support</h3>
            <ul className="space-y-3 font-bold">
              <li>
                <Link
                  href="/help-center"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-use"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Terms Of Use
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/content-complaints"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Content Complaints
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect With Us */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Connect With Us</h3>
            <div className="flex space-x-4">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#2a2a2a] h-12 w-12 rounded-full flex items-center justify-center hover:bg-[#3a3a3a] transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#2a2a2a] h-12 w-12 rounded-full flex items-center justify-center hover:bg-[#3a3a3a] transition-colors"
              >
                <Twitter className="h-6 w-6" />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#2a2a2a] h-12 w-12 rounded-full flex items-center justify-center hover:bg-[#3a3a3a] transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </Link>
              <Link
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#2a2a2a] h-12 w-12 rounded-full flex items-center justify-center hover:bg-[#3a3a3a] transition-colors"
              >
                <Youtube className="h-6 w-6" />
              </Link>
            </div>
          </div>

          {/* Download the App */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Download the App</h3>
            <div className="flex flex-col space-y-4">
              <Link
                href="https://play.google.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={GooglePlay}
                  alt="Get it on Google Play"
                  width={135}
                  height={40}
                  className="rounded"
                  style={{ width: "auto", height: "auto" }}
                />
              </Link>
              <Link
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={AppleStore}
                  alt="Download on the App Store"
                  width={135}
                  height={40}
                  className="rounded"
                  style={{ width: "auto", height: "auto" }}
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright and Logo */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-5 border-t border-[#2a2a2a]">
          <p className="text-gray-400 text-sm mb-3 md:mb-0">
            Copyright © 2025 Star India Private Limited. All rights reserved.
          </p>
          <div className="relative h-12 w-12 rounded-full flex items-center justify-center">
            <Image
              src={JioLogo}
              alt="JioCinema Logo"
              width={60}
              height={60}
              className="w-12 h-12"
              style={{ width: "auto", height: "auto" }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
