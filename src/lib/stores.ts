import { writable } from 'svelte/store';
import type { LessonResult } from '$lib/types';

export const lessonResults = writable<LessonResult[]>([]);
