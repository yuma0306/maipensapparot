<script lang="ts">
	import type { ExamQuestion } from '$lib/types';
	import Card from '$lib/components/Card/Card.svelte';
	import Stack from '$lib/components/Stack/Stack.svelte';
	import Typography from '$lib/components/Typography/Typography.svelte';
	import FlexColumn from '$lib/components/FlexColumn/FlexColumn.svelte';
	import ListItem from '$lib/components/ListItem/ListItem.svelte';
	import VoiceButton from '$lib/components/VoiceButton/VoiceButton.svelte';
	import CopyButton from '$lib/components/CopyButton/CopyButton.svelte';

	type Props = {
		question: ExamQuestion;
	};

	let { question }: Props = $props();
</script>

<Card variant="li" borderColor="gray" hasBorderLeft={true}>
	<Stack size={2} variant="div">
		<div class="question-block" data-has-words={question.words && question.words.length > 0}>
			<div class="question-main">
				<Stack size={1} variant="div">
					<FlexColumn gap={1} variant="div" alignItems="center" justifyContent="start">
						<Typography size={4} variant="p" color="primary" weight="bold" align="left">
							{question.title}
						</Typography>
						{#if question.title}
							<VoiceButton text={question.title} />
							<CopyButton text={question.title} />
						{/if}
					</FlexColumn>
					<Typography size={2} variant="p" color="dark" weight="normal" align="left">
						{question.meaning}
					</Typography>
				</Stack>
			</div>
			{#if question.words?.length}
				<div class="word-list footer">
					<Stack size={2} variant="ul">
						{#each question.words as word}
							<ListItem symbol="none">
								<FlexColumn
									gap={1}
									variant="div"
									alignItems="center"
									justifyContent="start"
									isWrap={true}
								>
									<Typography size={2} variant="span" color="primary" weight="bold" align="left">
										{word.word}
									</Typography>
									<Typography size={2} variant="span" color="dark" weight="normal" align="left">
										{word.meaning}
									</Typography>
									<FlexColumn
										gap={1}
										variant="div"
										alignItems="center"
										justifyContent="start"
										isWrap={true}
									>
										{#if word.word}
											<VoiceButton text={word.word} />
											<CopyButton text={word.word} />
										{/if}
									</FlexColumn>
								</FlexColumn>
							</ListItem>
						{/each}
					</Stack>
				</div>
			{/if}
		</div>
		<ul class="options">
			{#each question.options as option, i}
				<li class="option" data-is-correct={option.isCorrect}>
					<div class="option-content">
						<FlexColumn
							gap={1}
							variant="div"
							alignItems="center"
							justifyContent="start"
							isWrap={true}
						>
							<div class="option-label">
								<Typography size={2} variant="span" color="primary" weight="bold" align="left">
									{i + 1}. {option.option}
								</Typography>
							</div>
							<FlexColumn
								gap={1}
								variant="div"
								alignItems="center"
								justifyContent="start"
								isWrap={true}
							>
								{#if option.option}
									<VoiceButton text={option.option} />
									<CopyButton text={option.option} />
								{/if}
							</FlexColumn>
						</FlexColumn>
						{#if option.meaning || (option.words && option.words.length > 0)}
							<div class="option-excerpt">
								{#if option.meaning}
									<Typography size={2} variant="span" color="dark" weight="normal" align="left">
										{option.meaning}
									</Typography>
								{/if}
								{#if option.words?.length}
									<div class="word-list">
										<Stack size={2} variant="ul">
											{#each option.words as word}
												<ListItem symbol="none">
													<FlexColumn
														gap={1}
														variant="div"
														alignItems="center"
														justifyContent="start"
														isWrap={true}
													>
														<Typography
															size={2}
															variant="span"
															color="primary"
															weight="bold"
															align="left"
														>
															{word.word}
														</Typography>
														<Typography
															size={2}
															variant="span"
															color="dark"
															weight="normal"
															align="left"
														>
															{word.meaning}
														</Typography>
														<FlexColumn
															gap={1}
															variant="div"
															alignItems="center"
															justifyContent="start"
															isWrap={true}
														>
															{#if word.word}
																<VoiceButton text={word.word} />
																<CopyButton text={word.word} />
															{/if}
														</FlexColumn>
													</FlexColumn>
												</ListItem>
											{/each}
										</Stack>
									</div>
								{/if}
							</div>
						{/if}
					</div>
				</li>
			{/each}
		</ul>
	</Stack>
</Card>

<style>
	.question-block {
		position: relative;
		display: grid;
		align-items: start;
	}
	@media (min-width: 640px) {
		.question-block {
			row-gap: calc(var(--spacing-4) * 1px);
			column-gap: calc(var(--spacing-4) * 1px);
		}
		.question-block[data-has-words='true'] {
			grid-template-columns: 1fr 1fr;
		}
		.question-block[data-has-words='true']::before {
			content: '';
			position: absolute;
			top: 50%;
			left: 50%;
			width: 1px;
			height: 100%;
			background-color: var(--color-gray);
			translate: 0 -50%;
		}
	}
	@media (max-width: 639px) {
		.question-block[data-has-words='true'] {
			gap: calc(var(--spacing-4) * var(--calc-sp));
			grid-template-rows: auto 1fr;
		}
	}
	.word-list.footer {
		position: relative;
		margin-top: 0;
		padding-top: 0;
		border-top: none;
	}
	@media (max-width: 639px) {
		.word-list.footer::before {
			content: '';
			position: absolute;
			top: calc(-1 * var(--spacing-2) * var(--calc-sp));
			left: 0;
			width: 100%;
			height: 1px;
			background-color: var(--color-gray);
		}
	}
	.options {
		border-top: 1px solid var(--color-gray);
	}
	@media (max-width: 639px) {
		.options {
			row-gap: calc(var(--calc-sp) * var(--spacing-1));
		}
	}
	.option {
		display: grid;
		gap: calc(var(--spacing-1) * 1px);
		padding: calc(var(--spacing-1) * 1px) calc(var(--spacing-2) * 1px);
		border-bottom: 1px solid var(--color-gray);
	}
	.option[data-is-correct='true'] {
		border-left: 3px solid var(--color-success);
	}
	.option-content {
		display: flex;
		flex-direction: column;
		gap: calc(var(--spacing-1) * 1px);
	}
	@media (max-width: 639px) {
		.option-content {
			gap: calc(var(--spacing-1) * var(--calc-sp));
		}
	}
	.option-label {
		display: flex;
		align-items: center;
		gap: calc(var(--spacing-1) * 1px);
	}
	.word-list {
		margin-top: calc(var(--spacing-2) * 1px);
		padding-top: calc(var(--spacing-2) * 1px);
		border-top: 1px solid var(--color-gray);
	}
	@media (max-width: 639px) {
		.option {
			gap: calc(var(--calc-sp) * var(--spacing-1));
			padding: calc(var(--calc-sp) * var(--spacing-1)) 0;
		}
		.option[data-is-correct='true'] {
			padding-left: calc(var(--calc-sp) * var(--spacing-2));
		}
		.word-list {
			margin-top: calc(var(--calc-sp) * var(--spacing-2));
			padding-top: calc(var(--calc-sp) * var(--spacing-2));
		}
	}
</style>
