export default function Footer() {
    return (
        <div className="bg-gray-800 text-white p-8 flex flex-col lg:flex-row">
            <div className="flex">
                <h3 className="text-xl font-bold mb-4">👋Checkout my best projects:</h3>

                <div className="mb-4 max-w-96 text-justify mx-5">
                    <p className="text-lg font-semibold">🚀 CodeHub</p>
                    <p className="text-sm text-gray-400 mb-2">Elevate your coding experience! Collaborate in real-time with shared code, audio, and video calls. It goes beyond, and allows users to run code directly in browser.</p>
                    <a
                        href="https://github.com/Ujjwal-S/Code-Hub#readme"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                    >
                        GitHub Link
                    </a>
                </div>

                <div className="max-w-96 text-justify mx-5">
                    <p className="text-lg font-semibold ">🚀 Discord Clone</p>
                    <p className="text-sm text-gray-400 mb-2 text-justify" >Step into real-time conversations with the Discord Clone React WebApp! Chat, join servers, and message friends effortlessly. Users can enjoy lightning-fast performance with IndexedDB for local message caching.</p>
                    <a
                        href="https://github.com/Ujjwal-S/Discord-Clone#readme"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                    >
                        GitHub Link
                    </a>
                </div>
            </div>
        </div>
    )
}