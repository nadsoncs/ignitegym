import { Heading, VStack, SectionList, Text } from 'native-base';
import { HistoryCard } from '@components/HistoryCard';
import { ScreenHeader } from '@components/ScreenHeader';
import { useState } from 'react';

export function History() {
  const [exercises, setExercises] = useState([
    {
      title: "26.08.2023",
      data: ["Puxada frontal", "Remada unilateral"]
    },
    {
      title: "27.08.2023",
      data: ["Supino inclinado", "Crossover"]
    }
  ]);
  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de exercícios"/>

      <SectionList
        sections={exercises}
        keyExtractor={item => item}
        renderSectionHeader={({ section }) => (
          <Heading color="gray.200" fontSize="md"  fontFamily="heading" mt={10} mb={3}>
            {section.title}
          </Heading>
        )}
        renderItem={({ item}) => (
          <HistoryCard />
        )}
        contentContainerStyle={exercises.length === 0 && { flex:1, justifyContent: 'center'}}
        ListEmptyComponent={() => (
          <Text color="gray.100" textAlign="center">
            Não há exercícios registrados. {'\n'}
            Vá treinar, preguiçoso!
          </Text>
        )}
        showsVerticalScrollIndicator={false}
        px={8}
      />
    </VStack>
  )
}