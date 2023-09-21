import { fetchProjects } from '~/lib/projects';
import { Layout } from '~/layouts';
import { Animate, List } from '~/components';
import { ListActionType } from '~/types';

import type { GetStaticProps } from 'next';

import type { ListAction, Project } from '~/types';

interface ProjectProps {
	stringifiedProjects: string;
}

export const getStaticProps: GetStaticProps<ProjectProps> = async () => {
	const projects = await fetchProjects();

	return {
		props: {
			stringifiedProjects: JSON.stringify(projects),
		},
		revalidate: 3600,
	};
};

export default function ProjectsPage({ stringifiedProjects }: ProjectProps): JSX.Element {
	const projects = JSON.parse(stringifiedProjects) as Array<Project>;

	return (
		<Layout.Default seo={{ title: 'nuro ─ projects' }}>
			<div className="my-24 mx-2 sm:mx-6 lg:mb-28 lg:mx-8">
				<div className="relative max-w-xl mx-auto">
					<List.Container>
						{projects.map((project, index) => (
							<Animate
								animation={{ y: [50, 0], opacity: [0, 1] }}
								key={index}
								transition={{
									delay: 0.1 * index,
								}}>
								<List.Item
									actions={[
										...(project.post
											? [
													{
														type: ListActionType.LINK,
														external: false,
														href: project.post,
														icon: 'feather:edit-3',
														label: `Blog post about ${project.name}`,
													} as ListAction,
											  ]
											: []),
										...(project.homepage
											? [
													{
														type: ListActionType.LINK,
														href: project.homepage,
														icon: 'feather:home',
														label: `${project.name} homepage`,
													} as ListAction,
											  ]
											: []),
										{
											type: ListActionType.LINK,
											href: project.url,
											icon: 'feather:github',
											label: 'GitHub Repository',
										},
									]}
									description={project.description}
									icon={<span className="text-xl">{project.icon}</span>}
									title={project.name}
								/>
							</Animate>
						))}
					</List.Container>
				</div>
			</div>
		</Layout.Default>
	);
}

// import dynamic from 'next/dynamic';
// import { Icon } from '@iconify/react';

// import { Animate, Button, Pill } from '~/components';
// import { EventType, NavigationItemType } from '~/types';
// import { Layout } from '~/layouts';

// import type { EventProps } from '~/components/Event.component';
// import type { NavigationItem } from '~/types';

// const Event = dynamic<EventProps>(
// 	() => import('~/components/Event.component').then(({ Event }) => Event),
// 	{
// 		ssr: false,
// 	},
// );

// const ACTIONS: Array<NavigationItem> = [
// 	{
// 		type: NavigationItemType.LINK,
// 		href: '/blog',
// 		icon: <Icon className="mr-3" icon="feather:edit-3" />,
// 		text: 'Blog',
// 	},
// 	{
// 		type: NavigationItemType.LINK,
// 		href: '/projects',
// 		icon: <Icon className="mr-3" icon="feather:copy" />,
// 		text: 'Projects',
// 	},
// 	{
// 		type: NavigationItemType.LINK,
// 		external: true,
// 		href: 'https://github.com/nurodev',
// 		icon: <Icon className="mr-3" icon="feather:github" />,
// 		text: 'GitHub',
// 	},
// ];

// export default function HomePage(): JSX.Element {
// 	const today = new Date();
// 	const birthday = new Date('1997-08-09');
// 	const isBirthday =
// 		today.getDate() === birthday.getDate() && today.getMonth() === birthday.getMonth();

// 	const description = `I am a software engineer & games developer`;

// 	return (
// 		<Layout.Default>
// 			{isBirthday && <Event event={EventType.BIRTHDAY} />}
// 			<div className="min-h-screen flex items-center justify-center py-12">
// 				<div className="max-w-md sm:max-w-lg md:sm:max-w-2xl lg:sm:max-w-3xl w-full space-y-8 text-center">
// 					<Animate
// 						as="h1"
// 						animation={{
// 							opacity: [0, 1],
// 							scale: [0.75, 1],
// 						}}
// 						className="text-gray-500 dark:text-white text-5xl sm:text-6xl md:text-6xl lg:text-8xl tracking-tight font-extrabold">
// 						Hey <span className="inline-block origin-70 hover:(animate-wave)">👋</span>{' '}
// 						I&apos;m Ben, <br className="hidden sm:block" />a{' '}
// 						<Pill.Standard className="mt-4">developer</Pill.Standard>
// 					</Animate>

// 					<Animate
// 						as="p"
// 						animation={{
// 							opacity: [0, 1],
// 							scale: [0.75, 1],
// 						}}
// 						className="max-w-xs mt-4 md:mt-8 mx-auto text-base text-gray-400 sm:text-lg md:text-xl md:max-w-3xl"
// 						transition={{
// 							delay: 0.5,
// 						}}>
// 						{description}
// 					</Animate>

// 					<div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-4 space-y-4 sm:space-y-0 w-full mt-8 sm:mt-4">
// 						{ACTIONS.map((action, index) => {
// 							if (action.type !== NavigationItemType.LINK) return null;

// 							return (
// 								<Animate
// 									animation={{
// 										y: [50, 0],
// 										opacity: [0, 1],
// 									}}
// 									className="w-full sm:w-auto"
// 									key={index}
// 									transition={{
// 										delay: 0.1 * (index + 2) + 0.5,
// 									}}>
// 									<Button.Outline href={action.href}>
// 										{action.icon}
// 										<span>{action.text}</span>
// 									</Button.Outline>
// 								</Animate>
// 							);
// 						})}
// 					</div>
// 				</div>
// 			</div>
// 		</Layout.Default>
// 	);
// }
