import type { Situation } from '$lib/types';

export const situations: Situation[] = [
	{
		id: 'greeting',
		title:
			'挨拶挨拶挨拶挨拶挨拶挨拶挨拶挨拶挨拶挨拶挨拶挨拶挨拶挨拶挨拶挨拶挨拶挨拶挨拶挨拶挨拶挨拶挨拶挨拶',
		description: '基本的な挨拶のフレーズを集めました。',
		phrases: [
			{
				id: 'g1',
				thai: 'สวัสดีครับ',
				japanese: 'こんにちは（男性）',
				words: [
					{ thai: 'สวัสดี', meaning: 'こんにちは' },
					{ thai: 'ครับ', meaning: '丁寧語（男性）' }
				]
			},
			{
				id: 'g2',
				thai: 'สวัสดีค่ะ',
				japanese: 'こんにちは（女性）',
				words: [
					{ thai: 'สวัสดี', meaning: 'こんにちは' },
					{ thai: 'ค่ะ', meaning: '丁寧語（女性）' }
				]
			},
			{
				id: 'g3',
				thai: 'สบายดีไหม',
				japanese: '元気ですか？',
				words: [
					{ thai: 'สบายดี', meaning: '元気' },
					{ thai: 'ไหม', meaning: '〜ですか？' }
				]
			},
			{
				id: 'g4',
				thai: 'ขอบคุณครับ',
				japanese: 'ありがとうございます（男性）',
				words: [
					{ thai: 'ขอบคุณ', meaning: 'ありがとう' },
					{ thai: 'ครับ', meaning: '丁寧語（男性）' }
				]
			},
			{
				id: 'g5',
				thai: 'ไม่เป็นไร',
				japanese: '大丈夫です / どういたしまして',
				words: [
					{ thai: 'ไม่', meaning: '〜ない' },
					{ thai: 'เป็นไร', meaning: '問題がある' }
				]
			}
		]
	},
	{
		id: 'restaurant',
		title: 'レストラン',
		description: 'レストランやカフェで使える定番フレーズを集めました。',
		phrases: [
			{
				id: 'r1',
				thai: 'ขอเมนูหน่อยครับ',
				japanese: 'メニューをください（男性）',
				words: [
					{ thai: 'ขอ', meaning: '〜をください' },
					{ thai: 'เมนู', meaning: 'メニュー' },
					{ thai: 'หน่อย', meaning: '少し / ちょっと' },
					{ thai: 'ครับ', meaning: '丁寧語（男性）' }
				]
			},
			{
				id: 'r2',
				thai: 'อร่อยมาก',
				japanese: 'とても美味しい',
				words: [
					{ thai: 'อร่อย', meaning: '美味しい' },
					{ thai: 'มาก', meaning: 'とても' }
				]
			},
			{
				id: 'r3',
				thai: 'เช็คบิลด้วยครับ',
				japanese: 'お会計お願いします（男性）',
				words: [
					{ thai: 'เช็คบิล', meaning: '会計する' },
					{ thai: 'ด้วย', meaning: '〜も / お願いします' },
					{ thai: 'ครับ', meaning: '丁寧語（男性）' }
				]
			},
			{
				id: 'r4',
				thai: 'ไม่เผ็ด',
				japanese: '辛くしないで',
				words: [
					{ thai: 'ไม่', meaning: '〜ない' },
					{ thai: 'เผ็ด', meaning: '辛い' }
				]
			},
			{
				id: 'r5',
				thai: 'น้ำเปล่าหนึ่งขวด',
				japanese: '水を一本',
				words: [
					{ thai: 'น้ำเปล่า', meaning: '水' },
					{ thai: 'หนึ่ง', meaning: '一' },
					{ thai: 'ขวด', meaning: '本（ボトルの類別詞）' }
				]
			}
		]
	},
	{
		id: 'transportation',
		title: '交通',
		description:
			'移動時に使えるフレーズを集めました。移動時に使えるフレーズを集めました。移動時に使えるフレーズを集めました。',
		phrases: [
			{
				id: 't1',
				thai: 'ไปที่นี่',
				japanese: 'ここに行ってください',
				words: [
					{ thai: 'ไป', meaning: '行く' },
					{ thai: 'ที่นี่', meaning: 'ここ' }
				]
			},
			{
				id: 't2',
				thai: 'เท่าไหร่',
				japanese: 'いくらですか？',
				words: [{ thai: 'เท่าไหร่', meaning: 'いくら' }]
			},
			{
				id: 't3',
				thai: 'แพงไป',
				japanese: '高すぎます',
				words: [
					{ thai: 'แพง', meaning: '高い（値段）' },
					{ thai: 'ไป', meaning: '〜すぎる' }
				]
			},
			{
				id: 't4',
				thai: 'จอดตรงนี้',
				japanese: 'ここで止めてください',
				words: [
					{ thai: 'จอด', meaning: '止める' },
					{ thai: 'ตรงนี้', meaning: 'ここ' }
				]
			},
			{
				id: 't5',
				thai: 'ใกล้ไหม',
				japanese: '近いですか？',
				words: [
					{ thai: 'ใกล้', meaning: '近い' },
					{ thai: 'ไหม', meaning: '〜ですか？' }
				]
			}
		]
	},
	{
		id: 'shopping',
		title: 'ショッピング',
		description: '買い物で使えるフレーズを集めました。',
		phrases: [
			{
				id: 's1',
				thai: 'ลดได้ไหม',
				japanese: '値引きできますか？',
				words: [
					{ thai: 'ลด', meaning: '値引きする' },
					{ thai: 'ได้', meaning: 'できる' },
					{ thai: 'ไหม', meaning: '〜ですか？' }
				]
			},
			{
				id: 's2',
				thai: 'ขอลองได้ไหม',
				japanese: '試着できますか？',
				words: [
					{ thai: 'ขอ', meaning: '〜させてください' },
					{ thai: 'ลอง', meaning: '試す' },
					{ thai: 'ได้ไหม', meaning: 'できますか？' }
				]
			},
			{
				id: 's3',
				thai: 'มีสีอื่นไหม',
				japanese: '他の色はありますか？',
				words: [
					{ thai: 'มี', meaning: 'ある' },
					{ thai: 'สี', meaning: '色' },
					{ thai: 'อื่น', meaning: '他の' },
					{ thai: 'ไหม', meaning: '〜ですか？' }
				]
			},
			{
				id: 's4',
				thai: 'เอาอันนี้',
				japanese: 'これをください',
				words: [
					{ thai: 'เอา', meaning: '取る / もらう' },
					{ thai: 'อัน', meaning: '個（類別詞）' },
					{ thai: 'นี้', meaning: 'この' }
				]
			},
			{
				id: 's5',
				thai: 'แพงไปลดหน่อย',
				japanese: '高いので少し安くして',
				words: [
					{ thai: 'แพง', meaning: '高い' },
					{ thai: 'ไป', meaning: '〜すぎる' },
					{ thai: 'ลด', meaning: '下げる' },
					{ thai: 'หน่อย', meaning: '少し' }
				]
			}
		]
	}
];

export function getSituationById(id: string): Situation | undefined {
	return situations.find((s) => s.id === id);
}
