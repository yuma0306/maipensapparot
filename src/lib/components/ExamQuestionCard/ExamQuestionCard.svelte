<script lang="ts">
	import type { ExamQuestion, ExamWord } from '$lib/types';
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
		<div class="question-block">
			<Stack size={1} variant="div">
				<FlexColumn gap={1} variant="div" alignItems="center" justifyContent="start">
					<Typography size={4} variant="p" color="primary" weight="bold" align="left">
						{question.title}
					</Typography>
					<VoiceButton text={question.title} />
					<CopyButton text={question.title} />
				</FlexColumn>
				<Typography size={2} variant="p" color="dark" weight="normal" align="left">
					{question.meaning}
				</Typography>
			</Stack>
			{#if question.words?.length}
				<div class="word-list">
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
										<VoiceButton text={word.word} />
										<CopyButton text={word.word} />
									</FlexColumn>
								</FlexColumn>
							</ListItem>
						{/each}
					</Stack>
				</div>
			{/if}
		</div>
		{#if question.image?.url}
			<img
				src={question.image.url}
				alt={question.meaning}
				width={question.image.width}
				height={question.image.height}
				class="image"
			/>
		{/if}
		<ul class="options">
			{#each question.options as option, i}
				<li class="option" data-is-correct={option.isCorrect}>
					<div class="option-content">
						<FlexColumn gap={1} variant="div" alignItems="center" justifyContent="start" isWrap={true}>
							<div class="option-label">
								{#if option.isCorrect}
									<span class="correct-badge" aria-label="正解">✓</span>
								{/if}
								<Typography size={2} variant="span" color="primary" weight="bold" align="left">
									{i + 1}. {option.option}
								</Typography>
							</div>
							<FlexColumn gap={1} variant="div" alignItems="center" justifyContent="start" isWrap={true}>
								<VoiceButton text={option.option} />
								<CopyButton text={option.option} />
							</FlexColumn>
						</FlexColumn>
						<Typography size={2} variant="span" color="dark" weight="normal" align="left">
							{option.meaning}
						</Typography>
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
													<VoiceButton text={word.word} />
													<CopyButton text={word.word} />
												</FlexColumn>
											</FlexColumn>
										</ListItem>
									{/each}
								</Stack>
							</div>
						{/if}
					</div>
				</li>
			{/each}
		</ul>
	</Stack>
</Card>

<style>
	.image {
		max-width: 100%;
		height: auto;
		border-radius: calc(var(--border-radius) * 1px);
	}
	@media (max-width: 639px) {
		.image {
			border-radius: calc(var(--calc-sp) * var(--border-radius));
		}
	}
	.options {
		display: grid;
		list-style: none;
		padding: 0;
		margin: 0;
		row-gap: calc(var(--spacing-1) * 1px);
	}
	@media (max-width: 639px) {
		.options {
			row-gap: calc(var(--calc-sp) * var(--spacing-1));
		}
	}
	.option {
		display: grid;
		gap: calc(var(--spacing-1) * 1px);
		padding: calc(var(--spacing-1) * 1px) 0;
		border-bottom: 1px solid var(--color-gray);
	}
	.option:last-child {
		border-bottom: none;
	}
	.option[data-is-correct='true'] {
		border-left: 3px solid var(--color-success);
		padding-left: calc(var(--spacing-2) * 1px);
	}
	.option-label {
		display: flex;
		align-items: center;
		gap: calc(var(--spacing-1) * 1px);
	}
	.correct-badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background-color: var(--color-success);
		color: var(--color-white);
		font-weight: bold;
		border-radius: 50%;
		width: 1.2em;
		height: 1.2em;
		font-size: 0.9em;
		flex-shrink: 0;
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
