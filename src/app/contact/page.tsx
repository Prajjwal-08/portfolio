'use client';

import { useState } from 'react';
import Image from 'next/image';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { Mail, Send, CheckCircle2, AlertCircle, MessageSquare, Linkedin, Github, Instagram } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setStatus({ type: 'error', message: 'Please enter your name.' });
      return;
    }
    if (!email.trim()) {
      setStatus({ type: 'error', message: 'Please enter your email address.' });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      // Add document to Firebase Firestore 'todos' collection as in existing setup
      await addDoc(collection(db, 'todos'), {
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        createdAt: new Date().toISOString(),
      });

      setStatus({
        type: 'success',
        message: 'Thank you! Your message has been sent successfully. I will get back to you soon!',
      });
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      console.error('Firebase submission error:', err);
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please try again or reach out directly via email.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-[#1cdce8]">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Let&apos;s Build Together</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
          Get in <span className="text-[#1cdce8]">Touch</span>
        </h1>

        <p className="text-gray-300 text-sm sm:text-base italic">
          &ldquo;Optimism is an occupational hazard of programming: feedback is treatment.&rdquo;
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Socials and Illustration */}
        <div className="lg:col-span-5 space-y-8 p-8 rounded-2xl glow-card">
          <div className="relative w-full h-48 flex items-center justify-center">
            <Image
              src="/contact.png"
              alt="Contact Illustration"
              width={220}
              height={220}
              className="object-contain"
            />
          </div>

          <div className="space-y-3 text-center sm:text-left">
            <h2 className="text-xl font-bold text-white">Connect on Social Media</h2>
            <p className="text-sm text-gray-300">
              Have an idea, project inquiry, or just want to chat about web technology? Feel free to connect!
            </p>
          </div>

          {/* Social Icons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <a
              href="https://www.linkedin.com/in/prajjwal-shrimal/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-[#0077b5]/20 border border-white/10 hover:border-[#0077b5] transition-all group"
            >
              <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-[#0077b5]" />
              <span className="text-sm font-medium text-gray-300 group-hover:text-white">LinkedIn</span>
            </a>

            <a
              href="https://github.com/Prajjwal-08"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 transition-all group"
            >
              <Github className="w-5 h-5 text-gray-400 group-hover:text-white" />
              <span className="text-sm font-medium text-gray-300 group-hover:text-white">GitHub</span>
            </a>

            <a
              href="https://www.behance.net/prajjwalshrimal"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-[#0057ff]/20 border border-white/10 hover:border-[#0057ff] transition-all group"
            >
              <span className="w-5 h-5 font-bold text-xs flex items-center justify-center text-gray-400 group-hover:text-[#0057ff]">
                Bē
              </span>
              <span className="text-sm font-medium text-gray-300 group-hover:text-white">Behance</span>
            </a>

            <a
              href="https://www.instagram.com/_.prajju08._/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-[#E1306C]/20 border border-white/10 hover:border-[#E1306C] transition-all group"
            >
              <Instagram className="w-5 h-5 text-gray-400 group-hover:text-[#E1306C]" />
              <span className="text-sm font-medium text-gray-300 group-hover:text-white">Instagram</span>
            </a>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7 p-8 sm:p-10 rounded-2xl glow-card">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Mail className="w-6 h-6 text-[#1cdce8]" />
              Send a Message
            </h2>

            {status && (
              <div
                className={`p-4 rounded-xl flex items-start gap-3 text-sm ${
                  status.type === 'success'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                }`}
              >
                {status.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 shrink-0" />
                )}
                <span>{status.message}</span>
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Prajjwal Shrimal"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#1cdce8] focus:ring-1 focus:ring-[#1cdce8] transition-all"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Your Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="prajjwal@example.com"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#1cdce8] focus:ring-1 focus:ring-[#1cdce8] transition-all"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Hi Prajjwal, I have a project opportunity..."
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#1cdce8] focus:ring-1 focus:ring-[#1cdce8] transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-neon justify-center py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span>Sending...</span>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
