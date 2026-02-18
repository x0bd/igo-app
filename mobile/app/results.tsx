import { YStack, XStack, Card, H2, H3, Text, Progress, Button, Spacer } from '@tamagui/core'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { ArrowLeft, Home } from 'lucide-react-native'
import { Image } from 'expo-image'
import { NutritionAnalysis } from '../types/nutrition'

export default function ResultsScreen() {
  const router = useRouter()
  const params = useLocalSearchParams<NutritionAnalysis & { imageUri: string }>()

  const nutritionData: NutritionAnalysis = {
    meal_name: params.meal_name || 'Unknown Meal',
    calories: Number(params.calories) || 0,
    protein: Number(params.protein) || 0,
    carbs: Number(params.carbs) || 0,
    fat: Number(params.fat) || 0,
    health_score: Number(params.health_score) || 0,
    igo_tip: params.igo_tip || 'Keep up the great work with your nutrition journey!',
  }

  // Calculate percentages (assuming daily targets: 2000 cal, 150g protein, 250g carbs, 65g fat)
  const proteinPercent = Math.min((nutritionData.protein / 150) * 100, 100)
  const carbsPercent = Math.min((nutritionData.carbs / 250) * 100, 100)
  const fatPercent = Math.min((nutritionData.fat / 65) * 100, 100)

  return (
    <YStack flex={1} backgroundColor="$background" padding="$4">
      {/* Header */}
      <XStack alignItems="center" gap="$3" marginBottom="$4">
        <Button
          size="$3"
          circular
          backgroundColor="$gray3"
          onPress={() => router.back()}
          pressStyle={{ opacity: 0.7 }}
        >
          <ArrowLeft size={24} color="#000000" />
        </Button>
        <H2 color="$cimasBlue" fontSize="$8" fontWeight="700">
          Analysis Results
        </H2>
      </XStack>

      <YStack flex={1} gap="$4" maxWidth={600} width="100%" alignSelf="center">
        {/* Meal Image */}
        <Card
          elevate
          size="$4"
          bordered
          borderRadius="$4"
          overflow="hidden"
          backgroundColor="$background"
        >
          <Image
            source={{ uri: params.imageUri }}
            style={{ width: '100%', height: 300 }}
            contentFit="cover"
          />
        </Card>

        {/* Meal Name */}
        <Card
          size="$4"
          bordered
          borderRadius="$4"
          padding="$4"
          backgroundColor="$background"
        >
          <H2 color="$cimasBlue" fontSize="$8" fontWeight="700" textAlign="center">
            {nutritionData.meal_name}
          </H2>
          <Text fontSize="$5" color="$gray10" textAlign="center" marginTop="$2">
            {nutritionData.calories} calories
          </Text>
        </Card>

        {/* Nutrition Grid */}
        <Card
          size="$4"
          bordered
          borderRadius="$4"
          padding="$4"
          backgroundColor="$background"
        >
          <H3 color="$gray11" fontSize="$7" fontWeight="600" marginBottom="$4">
            Nutrition Breakdown
          </H3>

          <YStack gap="$4">
            {/* Protein */}
            <YStack gap="$2">
              <XStack justifyContent="space-between" alignItems="center">
                <Text fontSize="$5" fontWeight="600" color="$cimasBlue">
                  Protein
                </Text>
                <Text fontSize="$5" fontWeight="500" color="$gray11">
                  {nutritionData.protein}g
                </Text>
              </XStack>
              <Progress
                value={proteinPercent}
                max={100}
                backgroundColor="$gray3"
                borderRadius="$2"
                height={12}
              >
                <Progress.Indicator
                  animation="bouncy"
                  backgroundColor="$cimasBlue"
                  borderRadius="$2"
                />
              </Progress>
            </YStack>

            {/* Carbs */}
            <YStack gap="$2">
              <XStack justifyContent="space-between" alignItems="center">
                <Text fontSize="$5" fontWeight="600" color="$accentOrange">
                  Carbs
                </Text>
                <Text fontSize="$5" fontWeight="500" color="$gray11">
                  {nutritionData.carbs}g
                </Text>
              </XStack>
              <Progress
                value={carbsPercent}
                max={100}
                backgroundColor="$gray3"
                borderRadius="$2"
                height={12}
              >
                <Progress.Indicator
                  animation="bouncy"
                  backgroundColor="$accentOrange"
                  borderRadius="$2"
                />
              </Progress>
            </YStack>

            {/* Fat */}
            <YStack gap="$2">
              <XStack justifyContent="space-between" alignItems="center">
                <Text fontSize="$5" fontWeight="600" color="$igoGreen">
                  Fat
                </Text>
                <Text fontSize="$5" fontWeight="500" color="$gray11">
                  {nutritionData.fat}g
                </Text>
              </XStack>
              <Progress
                value={fatPercent}
                max={100}
                backgroundColor="$gray3"
                borderRadius="$2"
                height={12}
              >
                <Progress.Indicator
                  animation="bouncy"
                  backgroundColor="$igoGreen"
                  borderRadius="$2"
                />
              </Progress>
            </YStack>
          </YStack>
        </Card>

        {/* Health Score */}
        <Card
          size="$4"
          bordered
          borderRadius="$4"
          padding="$4"
          backgroundColor="$background"
        >
          <XStack justifyContent="space-between" alignItems="center">
            <Text fontSize="$6" fontWeight="600" color="$gray11">
              Health Score
            </Text>
            <Text fontSize="$8" fontWeight="700" color="$igoGreen">
              {nutritionData.health_score}/100
            </Text>
          </XStack>
        </Card>

        {/* iGo Tip */}
        <Card
          size="$4"
          bordered
          borderRadius="$4"
          padding="$4"
          backgroundColor="$igoGreen"
          animation="bouncy"
        >
          <YStack gap="$2">
            <H3 color="white" fontSize="$6" fontWeight="700">
              💡 iGo Tip
            </H3>
            <Text color="white" fontSize="$5" lineHeight="$6">
              {nutritionData.igo_tip}
            </Text>
          </YStack>
        </Card>

        <Spacer size="$2" />

        {/* Action Buttons */}
        <XStack gap="$3" width="100%">
          <Button
            flex={1}
            size="$5"
            backgroundColor="$gray3"
            color="$gray11"
            borderRadius="$4"
            paddingVertical="$4"
            fontSize="$6"
            fontWeight="600"
            onPress={() => router.push('/camera')}
            pressStyle={{ opacity: 0.8 }}
          >
            Scan Again
          </Button>
          <Button
            flex={1}
            size="$5"
            backgroundColor="$cimasBlue"
            color="white"
            borderRadius="$4"
            paddingVertical="$4"
            fontSize="$6"
            fontWeight="600"
            onPress={() => router.push('/')}
            pressStyle={{ opacity: 0.8 }}
            animation="bouncy"
          >
            <Home size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
            Home
          </Button>
        </XStack>
      </YStack>
    </YStack>
  )
}

