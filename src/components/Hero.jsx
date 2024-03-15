import { logo } from '../assets'

const Hero = () => {
	return (
		<header className="w-full flex justify-center items-center flex-col">
			<nav className="flex justify-between items-center w-full mt-3 mb-10">
				<img
					src={logo}
					alt="sumz logo"
					className="w-28 object-contain"
				/>
				<button
					type="button"
					className="black_btn"
					onClick={() =>
						window.open('https://github.com/bokarios')
					}
				>
					Github
				</button>
			</nav>
			<h1 className="head_text">
				Summarize articles with{' '}
				<br className="max-md:hidden" />
				<span className="orange_gradient">
					OpenAI GPT-4
				</span>
			</h1>
			<h2 className="desc">
				Tired of reading long bile of text to get the idea
				of something, no worries, our AI summarizer will do
				that for you.
			</h2>
		</header>
	)
}

export default Hero
