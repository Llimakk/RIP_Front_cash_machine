import React, { useState, useEffect } from "react";
import "./opercard.css";

interface OperatCardProps {
  image: string; // Ссылка на изображение купюры
  name: string; // Название купюры
  count: number; // Количество купюр
  billId: number; // ID купюры
  onUpdateCount: (billId: number, newCount: number) => void;
  isEditable: boolean;
}

const OperatCard = ({
  image,
  name,
  count,
  billId,
  onUpdateCount,
  isEditable,
}: OperatCardProps) => {
  const [inputCount, setInputCount] = useState<number>(count); // Локальное состояние для ввода
  const [isSaving, setIsSaving] = useState<boolean>(false); // Состояние загрузки

  // Синхронизация локального состояния с пропсами при изменении count
  useEffect(() => {
    setInputCount(count);
  }, [count]);

  // Обработчик ввода количества
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1) {
      setInputCount(value);
    }
  };

  // Сохранение изменений
  const saveCount = async () => {
    setIsSaving(true);
    try {
      await onUpdateCount(billId, inputCount); // Вызываем переданную функцию
    } catch (error) {
      console.error("Ошибка сохранения количества:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="operat-card">
      <div className="operat-card-image">
        <img src={image} alt={name} />
      </div>
      <div className="operat-card-info">
        <p className="operat-card-name">{name}</p>
      </div>
      <div className="operat-card-count">
        <input
          type="number"
          min="1"
          value={inputCount}
          onChange={handleInputChange}
          disabled={!isEditable || isSaving}
        />
        <button onClick={saveCount} disabled={!isEditable || isSaving}>
          {isSaving ? "Сохранение..." : "Сохранить"}
        </button>
      </div>
    </div>
  );
};

export default OperatCard;
