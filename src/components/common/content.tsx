import React, { useState } from 'react';
import { SHA256 } from 'crypto-js';
import axios from 'axios';
import { FormData } from '@/app.interface';
import { generateRequest } from '@/api';
import { TextDisplay } from './textdisplay';

export const Content = () => {
  const [formData, setFormData] = useState<FormData>({
    vacancyName: '',
    companyName: '',
    companyPlace: '',
    schedule: '',   
    experience: '',
    keySkills: [],
  });

  const [tokens, setTokens] = useState<string[]>([])

  const texts = tokens.map((token, index) => {
    return <TextDisplay key={index} token={token}></TextDisplay>
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleKeySkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keySkills = e.target.value.split(',').map(skill => skill.trim());
    setFormData({ ...formData, keySkills });
  };

  const generateToken = (data: FormData) => {
    const timestamp = new Date().getTime();
    const combinedData = { ...data, timestamp };
    const jsonString = JSON.stringify(combinedData);
    const hash = SHA256(jsonString).toString();
    return hash;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const token = generateToken(formData);
      const combinedData = { ...formData, token };
      const response = await generateRequest(combinedData)
      if (response.status === 200) {
          console.log('Запрос успешно отправлен');
          setTokens([...tokens, token])
      } else {
          console.error('Произошла ошибка при отправке запроса');
      }
  } catch (error) {
      console.error('Произошла ошибка:', error);
  }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="py-4 px-8">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Название вакансии:
            <input type="text" name="vacancyName" value={formData.vacancyName} onChange={handleChange} maxLength={100} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Название компании:
            <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} maxLength={200} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Расположение компании:
            <input type="text" name="companyPlace" value={formData.companyPlace} onChange={handleChange} maxLength={200} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            График работы:
            <input type="text" name="schedule" value={formData.schedule} onChange={handleChange} maxLength={200} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Опыт:
            <input type="text" name="experience" value={formData.experience} onChange={handleChange} maxLength={200} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Ключевые навыки:
            <input type="text" name="keySkills" value={formData.keySkills.join(', ')} onChange={handleKeySkillsChange} maxLength={200} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </label>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Отправить запрос</button>
      </form>
      <div>
        {texts}
      </div>
    </div>
  );
};