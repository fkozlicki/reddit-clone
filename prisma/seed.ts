import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
	// topics
	await prisma.topic.createMany({
		data: [
			{ name: 'Resilience', slug: 'resilience' },
			{ name: 'Self care', slug: 'self_care' },
			{ name: 'Sports', slug: 'sports' },
			{ name: 'Games', slug: 'games' },
			{ name: 'Wellness tips', slug: 'wellness_tips' },
			{ name: 'Crypto', slug: 'crypto' },
			{ name: 'Motivation', slug: 'motivation' },
			{ name: 'Productivity Hacks', slug: 'productivity_hacks' },
			{ name: 'Minimalism', slug: 'minimalism' },
		],
	});
	// users
	await prisma.user.upsert({
		where: { email: 'sparky@example.com' },
		update: {},
		create: {
			email: 'sparky@example.com',
			name: 'Sparky',
			posts: {
				create: [
					{
						title: 'Embracing Minimalism: A Journey to Simplify',
						content:
							"Hey fellow minimalists! 🌱 Today, let's discuss the joys of embracing a minimalist lifestyle. Share your favorite tips for decluttering, organizing, and simplifying your living space. How has minimalism positively impacted your life? Let's inspire each other to live with less and focus on what truly matters! #MinimalistLiving #SimplifyYourLife",
						community: {
							connectOrCreate: {
								where: {
									name: 'QuantumSquad',
								},
								create: {
									name: 'QuantumSquad',
									topic: {
										connect: {
											name: 'Minimalism',
										},
									},
								},
							},
						},
					},
					{
						title: 'My Minimalist Wardrobe: Quality Over Quantity',
						content:
							"🧘‍♀️ Curating a minimalist wardrobe has been a game-changer! Join me in celebrating the beauty of a capsule wardrobe. What are your go-to versatile pieces? Share your favorite sustainable fashion brands and let's encourage mindful consumption together! #CapsuleWardrobe #SustainableFashion",
						community: {
							connectOrCreate: {
								where: {
									name: 'QuantumSquad',
								},
								create: {
									name: 'QuantumSquad',
									topic: {
										connect: {
											name: 'Minimalism',
										},
									},
								},
							},
						},
					},
				],
			},
		},
	});
	await prisma.user.upsert({
		where: { email: 'tigerdave@emailprovider.com' },
		update: {},
		create: {
			email: 'tigerdave@emailprovider.com',
			name: 'TigerDave',

			posts: {
				create: [
					{
						title: "Sunday Self-Care Rituals: What's Your Routine?",
						content:
							"🌸 Happy Sunday, self-care enthusiasts! Share your favorite self-care rituals for a relaxing Sunday. Whether it's a bubble bath, a good book, or a nature walk, let's inspire each other to prioritize self-love and recharge for the week ahead. What's on your self-care agenda today? #SelfCareSunday #MeTime",
						community: {
							connectOrCreate: {
								where: {
									name: 'PixelPioneers',
								},
								create: {
									name: 'PixelPioneers',
									topic: {
										connect: {
											name: 'Self care',
										},
									},
								},
							},
						},
					},
					{
						title: "The Power of Saying 'No': Boundaries and Self-Care",
						content:
							"🚫 Learning to say 'no' is a vital aspect of self-care. How do you establish boundaries to protect your time and energy? Share your tips and experiences in setting healthy limits in both personal and professional relationships. Let's empower each other to prioritize our well-being! #SettingBoundaries #SelfLove",
						community: {
							connectOrCreate: {
								where: {
									name: 'PixelPioneers',
								},
								create: {
									name: 'PixelPioneers',
									topic: {
										connect: {
											name: 'Self care',
										},
									},
								},
							},
						},
					},
				],
			},
		},
	});
	await prisma.user.upsert({
		where: { email: 'jellybean@examplemail.com' },
		update: {},
		create: {
			email: 'jellybean@examplemail.com',
			name: 'JellyBean',
			posts: {
				create: [
					{
						title:
							'Daily Gratitude Challenge: What Are You Thankful For Today?',
						content:
							"🌈 Let's kick off a gratitude challenge! Share one thing you're grateful for today and spread positivity. It could be big or small, personal or universal. Gratitude transforms our outlook – let's create a ripple effect of appreciation together! #GratitudeChallenge #ThankfulThursday",
						community: {
							connectOrCreate: {
								where: {
									name: 'EchoEnclave',
								},
								create: {
									name: 'EchoEnclave',
									topic: {
										connect: {
											name: 'Productivity Hacks',
										},
									},
								},
							},
						},
					},
					{
						title: 'Gratitude Journaling: How It Transformed My Mindset',
						content:
							"📓 Gratitude journaling has been a game-changer for me. Have you tried it? Share your experiences and favorite prompts. Let's discuss how acknowledging the positive aspects of life can reshape our mindset and bring about a sense of fulfillment. #GratitudeJournal #Mindfulness",
						community: {
							connectOrCreate: {
								where: {
									name: 'EchoEnclave',
								},
								create: {
									name: 'EchoEnclave',
									topic: {
										connect: {
											name: 'Productivity Hacks',
										},
									},
								},
							},
						},
					},
				],
			},
		},
	});
	await prisma.user.upsert({
		where: { email: 'r.dizzle@mailservice.org' },
		update: {},
		create: {
			email: 'r.dizzle@mailservice.org',
			name: 'R-Dizzle',
			posts: {
				create: [
					{
						title: 'Morning Workout Motivation: What Gets You Moving?',
						content:
							"🏋️‍♂️ Rise and shine, fitness enthusiasts! Let's kickstart the day with some workout motivation. Share your go-to morning exercise routine or the fitness mantra that gets you out of bed. Whether it's cardio, weightlifting, or yoga, let's inspire each other to stay active and healthy! #MorningWorkout #FitnessMotivation",
						community: {
							connectOrCreate: {
								where: {
									name: 'NovaNetwork',
								},
								create: {
									name: 'NovaNetwork',
									topic: {
										connect: {
											name: 'Games',
										},
									},
								},
							},
						},
					},
					{
						title: "Team Sports vs. Solo Activities: What's Your Preference?",
						content:
							"⚽️ Team sports or solo workouts – what fuels your passion for fitness? Share your experiences and insights into the benefits of both. Let's discuss the camaraderie of team sports and the empowerment of individual achievements. What keeps you motivated on your fitness journey? #FitnessCommunity #HealthyLifestyle",
						community: {
							connectOrCreate: {
								where: {
									name: 'NovaNetwork',
								},
								create: {
									name: 'NovaNetwork',
									topic: {
										connect: {
											name: 'Games',
										},
									},
								},
							},
						},
					},
				],
			},
		},
	});
	await prisma.user.upsert({
		where: { email: 'breezy.em@example.net' },
		update: {},
		create: {
			email: 'breezy.em@example.net',
			name: 'BreezyEm',

			posts: {
				create: [
					{
						title: "Favorite Board Game Night: What's on Your Table?",
						content:
							"🎲 Board game enthusiasts, unite! Share your favorite board games for a cozy game night. From classics like Monopoly to strategic gems like Settlers of Catan, let's exchange recommendations and experiences. What's your all-time go-to game for a fun-filled evening? #BoardGames #GameNight",
						community: {
							connectOrCreate: {
								where: {
									name: 'NebulaNest',
								},
								create: {
									name: 'NebulaNest',
									topic: {
										connect: {
											name: 'Sports',
										},
									},
								},
							},
						},
					},
					{
						title: 'Gaming Memories: Your First Video Game Console',
						content:
							"🎮 Flashback time! What was your very first video game console, and which games left a lasting impression? Share your nostalgic gaming moments and let's reminisce about the pixelated adventures that shaped our love for gaming. Bonus points for sharing any funny or memorable gaming stories! #GamingNostalgia #VideoGames",
						community: {
							connectOrCreate: {
								where: {
									name: 'NebulaNest',
								},
								create: {
									name: 'NebulaNest',
									topic: {
										connect: {
											name: 'Sports',
										},
									},
								},
							},
						},
					},
				],
			},
		},
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
