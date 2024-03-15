import { useState, useEffect } from 'react'
import { copy, linkIcon, loader, tick } from '../assets'
import { useLazyGetSummaryQuery } from '../services/article'

const Demo = () => {
	const [article, setArticle] = useState({
		url: '',
		summary: '',
	})

	const [allArticles, setAllArticles] = useState([])

	const [getSummary, { error, isFetching }] =
		useLazyGetSummaryQuery()

	useEffect(() => {
		const localStorageArticles = JSON.parse(
			localStorage.getItem('articles')
		)

		localStorageArticles &&
			setAllArticles(localStorageArticles)
	}, [])

	const handleSubmit = async (e) => {
		e.preventDefault()

		const { data } = await getSummary({
			articleUrl: article.url,
		})

		if (data?.summary) {
			const newArticle = {
				...article,
				summary: data.summary,
			}
			const updatedArticles = [newArticle, ...allArticles]

			setArticle(newArticle)
			setAllArticles(updatedArticles)
			localStorage.setItem(
				'articles',
				JSON.stringify(updatedArticles)
			)
		}

		console.log(data)
	}

	return (
		<section className="mt-16 w-full max-w-xl">
			<div className="flex flex-col w-full gap-2">
				<form
					className="relative flex justify-center items-center"
					onSubmit={handleSubmit}
				>
					<img
						src={linkIcon}
						alt="link icon"
						className="absolute left-0 my-2 ml-3 w-5"
					/>
					<input
						type="url"
						placeholder="Enter a URL"
						value={article.url}
						className="url_input peer"
						onChange={(e) =>
							setArticle({
								...article,
								url: e.target.value,
							})
						}
						required
					/>
					<button
						type="submit"
						className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
					>
						&#9166;
					</button>
				</form>
				<div className="flex flex-col max-h-60 overflow-y-auto gap-1">
					{allArticles.map((article, index) => (
						<div
							key={`article-${index}`}
							className="link_card"
							onClick={() => setArticle(article)}
						>
							<div className="copy_btn">
								<img
									src={copy}
									alt="copy icon"
									className="w-[40%] h-[40%] object-contain"
								/>
							</div>
							<p className="flex-1 font-satoshi font-medium text-blue-700 text-sm truncate">
								{article.url}
							</p>
						</div>
					))}
				</div>
			</div>
			<div className="my-10 max-w-full flex justify-center items-center">
				{isFetching ? (
					<img
						src={loader}
						alt="loader"
						className="w-20 h-20 object-contain"
					/>
				) : error ? (
					<p className="font-inter font-bold text-black text-center">
						Oops!, something wired happens...
						<br />
						<span className="font-satoshi font-normal text-gray-700">
							{error?.data?.error}
						</span>
					</p>
				) : (
					article.summary && (
						<div className="flex flex-col gap-4">
							<h2 className="font-satoshi font-bold text-gray-600 text-2xl">
								Article{' '}
								<span className="blue_gradient">
									Summary
								</span>
							</h2>
							<div className="summary_box">
								<p className="font-inter font-medium text-sm text-gray-600 leading-loose">
									{article.summary}
								</p>
							</div>
						</div>
					)
				)}
			</div>
		</section>
	)
}

export default Demo
