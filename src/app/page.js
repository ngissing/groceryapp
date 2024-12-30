'use client'
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [meals, setMeals] = useState([]);
  const [selectedMeals, setSelectedMeals] = useState([]);

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Meal Planner</h1>
      
      <div className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle>This Week's Meals</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Select up to 7 meals for this week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {meals.map((meal) => (
          <Card key={meal.id} className="cursor-pointer hover:shadow-lg">
            <CardHeader>
              <CardTitle>{meal.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5">
                {meal.ingredients.map((ingredient, idx) => (
                  <li key={idx}>
                    {ingredient.quantity} {ingredient.unit} {ingredient.name}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}

