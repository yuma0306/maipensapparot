<script lang="ts">
	import type { ExamQuestion } from '$lib/types';
	import Card from '$lib/components/Card/Card.svelte';
	import Stack from '$lib/components/Stack/Stack.svelte';
	import Typography from '$lib/components/Typography/Typography.svelte';
	import FlexColumn from '$lib/components/FlexColumn/FlexColumn.svelte';
	import ListItem from '$lib/components/ListItem/ListItem.svelte';
	import VoiceButton from '$lib/components/VoiceButton/VoiceButton.svelte';
	import CopyButton from '$lib/components/CopyButton/CopyButton.svelte';
	import ExamQuestionCardHead from '$lib/components/ExamQuestionCardHead/ExamQuestionCardHead.svelte';

	type Props = {
		question: ExamQuestion;
	};

	let { question }: Props = $props();
</script>

<Card variant="li" borderColor="gray" hasBorderLeft={true}>
	<Stack size={2} variant="div">
		<ExamQuestionCardHead {question} />
		<ul class="options">
			{#each question.options as option, i}
				<li class="option" data-is-correct={option.isCorrect}>
					<FlexColumn
						gap={1}
						variant="div"
						alignItems="center"
						justifyContent="start"
						isWrap={true}
					>
						<Typography size={2} variant="span" color="primary" weight="bold" align="left">
							{i + 1}. {option.option}
						</Typography>
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
					<div class="option-excerpt">
						{#if option.meaning}
							<Typography size={2} variant="span" color="dark" weight="normal" align="left">
								{option.meaning}
							</Typography>
						{/if}
					</div>
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
				</li>
			{/each}
		</ul>
	</Stack>
</Card>

<style>
	.options {
		display: grid;
		list-style: none;
		padding: 0;
		margin: 0;
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
	@media (max-width: 639px) {
		.option {
			gap: calc(var(--calc-sp) * var(--spacing-1));
			padding: calc(var(--calc-sp) * var(--spacing-1)) 0;
		}
		.option[data-is-correct='true'] {
			padding-left: calc(var(--calc-sp) * var(--spacing-2));
		}
	}
</style>
