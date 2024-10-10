"use client"

import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import PersonalityTraitsChart from "./PersonalityTraitsChart"
import MoralFoundationChart from "./MoralFoundationChart"
import MBTIChart from "./MBTIChart"

type UserMetricsDisplayProps = {
  userMetrics: UserMetrics
  expanded?: boolean
}

const UserMetricsDisplay = ({ userMetrics, expanded }: UserMetricsDisplayProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>User Metrics</CardTitle>
        <CardDescription>View different aspects of user metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="personality" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personality">Personality Traits</TabsTrigger>
            <TabsTrigger value="moral">Moral Foundations</TabsTrigger>
            <TabsTrigger value="mbti">MBTI Metrics</TabsTrigger>
          </TabsList>
          <TabsContent value="personality">
            <PersonalityTraitsChart
              personalityTraits={userMetrics.personalityTraits}
              expanded={expanded}
            />
          </TabsContent>
          <TabsContent value="moral">
            <MoralFoundationChart
              moralFoundationScores={userMetrics.moralFoundationScores}
              expanded={expanded}
            />
          </TabsContent>
          <TabsContent value="mbti">
            <MBTIChart mbti={userMetrics.mbti} expanded={expanded} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default UserMetricsDisplay