exports.getWeatherScore = (type, weather) => {
    let score = 0;
    const { temp, precipitation, wind, condition } = weather;
  
    if (type === 'cricket' || type === 'sports') {
      if (temp >= 15 && temp <= 30) score += 30;
      if (precipitation < 20) score += 25;
      if (wind < 20) score += 20;
      if (condition.includes('clear') || condition.includes('cloud')) score += 25;
    }
    else if (type === 'wedding' || type === 'formal') {
      if (temp >= 18 && temp <= 28) score += 30;
      if (precipitation < 10) score += 30;
      if (wind < 15) score += 25;
      if (condition.includes('clear') || condition.includes('sun')) score += 15;
    }
    return score;
  };
  