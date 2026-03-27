<script lang="ts">
	import { colors, FiturComponent } from '$lib';
</script>

<div id="home" style="background-color: {colors.lightBlue};" class="px-4 py-20 lg:px-8 xl:px-16">
	<div class="flex flex-col-reverse items-center justify-center p-6 sm:mt-0 md:gap-32 lg:flex-row">
		<div class="max-w-2xl">
			<div class="mt-8 flex flex-col items-center lg:items-start">
				<h2
					style="color: {colors.darkIndigo}"
					class=" text-center text-3xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-left"
				>
					Embark on a Journey to Discover Your True Self
				</h2>
				<p
					style="color: {colors.darkIndigo}"
					class="mt-8 text-center text-justify text-lg font-medium text-pretty text-white sm:text-xl/8 lg:text-left"
				>
					Every choice is a path, and every answer is a step closer to your unique story. Explore
					our fun personality quizzes and unlock the magic within you.
				</p>
				<a
					href="/quizz"
					style="color: {colors.shadesWhite}"
					class="mt-4 w-[250px] rounded-2xl bg-pink-500 py-2 text-center hover:bg-pink-600 hover:text-white"
				>
					Start My Adventure</a
				>
			</div>
		</div>
		<div class="rounded-3xl bg-white p-4">
			<div class="h-80 w-full max-w-xs md:h-110 md:max-w-sm">
				<img
					src="/assets/images/img_hero_section1.png"
					alt="img"
					class="h-full w-full rounded-2xl object-cover"
				/>
			</div>
		</div>
	</div>
</div>
<div style="background-color: {colors.lightBlue};" class="px-6 py-12 lg:px-8 xl:px-16">
	<div class="flex flex-col items-center justify-center gap-4">
		<h3
			style="color: {colors.darkIndigo}"
			class="text-center text-3xl font-semibold tracking-tight text-balance sm:text-3xl"
		>
			Why Take Our Quizzes?
		</h3>
		<p
			style="color: {colors.darkIndigo}"
			class="mt-8 text-center text-justify text-lg font-medium text-pretty text-white sm:text-xl/8"
		>
			We blend psychological science with enchanting art to create a self-discovery journey that’s
			as fun as it is insightful.
		</p>
		<div class="mt-8 w-full">
			<div class="no-scrollbar w-full touch-pan-x overflow-x-auto scroll-smooth">
				<div class="flex gap-4 xl:items-center xl:justify-center">
					<FiturComponent
						src="/assets/images/img_art_ilustration.jpg"
						title="Breathtaking Visuals"
						desc="Lose yourself in hand-drawn, 3D-style illustrations. Each quiz is a visual masterpiece designed to make your journey truly magical."
					/>
					<FiturComponent
						src="/assets/images/img_insight_ilustration.jpg"
						title="Explore Your Inner World"
						desc="Go beyond the surface. Our tests are built on real psychological frameworks, giving you meaningful insights in a fun, accessible format."
					/>
					<FiturComponent
						src="/assets/images/img_shareable_ilustration.jpg"
						title="Share the Magic"
						desc="Receive a stunning, personalized cartoon card of your results. Perfect for sharing your unique personality with friends on social media."
					/>
				</div>
			</div>
		</div>
	</div>
</div>
