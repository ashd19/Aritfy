import React from "react";

export default function Contact() {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.currentTarget);

    formData.append("access_key", "93935c42-1199-404e-985d-670f1456bd56");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    }); 

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully ✅");
      event.currentTarget.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <div id='contact' className="min-h-screen bg-white flex items-center justify-center p-6">
      <form
        onSubmit={onSubmit}
        className="bg-gray-900 text-white w-full max-w-lg p-8 rounded-xl shadow-lg border border-gray-800"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Contact Me</h2>

        <div className="space-y-4">
          <input
            type="text"
            name="name"
            required
            placeholder="Your Name"
            className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            type="email"
            name="email"
            required
            placeholder="Your Email"
            className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <textarea
            name="message"
            required
            placeholder="Your Message"
            rows={5}
            className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-md transition-colors"
        >
          Submit Form
        </button>

        <p className="mt-4 text-center text-gray-400">{result}</p>
      </form>
    </div>
  );
}