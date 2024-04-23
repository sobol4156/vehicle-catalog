import { useState, useEffect } from 'react';
import { api } from '../../api';
import { Vehicle } from './Catalog.type';
import styles from './Catalog.module.css';

function App() {
    const [data, setData] = useState<Vehicle[]>([]);

    const [sortBy, setSortBy] = useState<string>('');
    const [refreshData, setRefreshData] = useState(false);

    // Запрос данных с сервера
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api();
                setData(response);

            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };

        fetchData();
    }, [refreshData]);
    // Логика сортировки
    const sortData = (key: string) => {
        const sortedData = [...data].sort((a, b) => {
            if (key === 'year') {
                return a.year - b.year;
            }
            if (key === 'yearDowm') {
                return b.year - a.year;
            }
            if (key === 'price') {
                return a.price - b.price;
            }
            if (key === 'priceDown') {
                return b.price - a.price;
            }
            return 0;
        });

        setData(sortedData);
        setSortBy(key);
    };
    // Логика сортировки по умолчанию
    const resetSort = () => {
        setRefreshData(!refreshData);
        setSortBy('');
    };

    return (
        <div>
            <h1 className={styles.header}>Транспортные средства</h1>
            <div className={styles.dropdown}>
                <select
                    onChange={(e) => {
                        const selectedValue = e.target.value;
                        if (selectedValue === "") {
                            resetSort();
                        } else {
                            sortData(selectedValue);
                        }
                    }}
                >
                    <option value=''>По умолчанию</option>
                    <option value="year">Год выпуска по возрастанию</option>
                    <option value="yearDowm">Год выпуска по убыванию</option>
                    <option value="price">Цена по возрастанию</option>
                    <option value="priceDown">Цена по убыванию</option>
                </select>
            </div>
            {data.length > 0 ? (
                <ul className={styles.vehicleList}>
                    {data.map(vehicle => (
                        <li key={vehicle.id} className={styles.vehicleItem}>
                            <p><strong>Название:</strong> {vehicle.name}</p>
                            <p><strong>Модель:</strong> {vehicle.editing ? (
                                <input
                                    type='text'
                                    value={vehicle.model}
                                    onChange={(e) => {
                                        const newValue = e.target.value;
                                        setData(data.map(item => {
                                            if (item.id === vehicle.id) {
                                                return { ...item, model: newValue };
                                            }
                                            return item;
                                        }));
                                    }}
                                />
                            ) : (
                                <span>{vehicle.model}</span>
                            )}</p>
                            <p><strong>Год:</strong> {vehicle.editing ? (
                                <input
                                    type='text'
                                    value={vehicle.year}
                                    onChange={(e) => {
                                        const newValue = e.target.value;
                                        setData(data.map(item => {
                                            if (item.id === vehicle.id) {
                                                return { ...item, year: parseInt(newValue, 10) };
                                            }
                                            return item;
                                        }));
                                    }}
                                />
                            ) : (
                                <span>{vehicle.year}</span>
                            )}</p>
                            <p><strong>Цвет:</strong> {vehicle.color}</p>
                            <p><strong>Цена:</strong> {vehicle.editing ? (
                                <input
                                    type='text'
                                    value={vehicle.price}
                                    onChange={(e) => {
                                        const newValue = e.target.value;
                                        setData(data.map(item => {
                                            if (item.id === vehicle.id) {
                                                return { ...item, price: parseInt(newValue, 10) };
                                            }
                                            return item;
                                        }));
                                    }}
                                />
                            ) : (
                                <span>{vehicle.price}</span>
                            )}</p>
                            <div className={styles.btn}>
                                <button onClick={() => {
                                    setData(data.map(item => {
                                        if (item.id === vehicle.id) {
                                            return { ...item, editing: !item.editing };
                                        }
                                        return item;
                                    }));
                                }}>{vehicle.editing ? "Сохранить" : "Редактировать"}</button>
                                <button onClick={() => { setData(data.filter(el => el.id !== vehicle.id)) }}>Удалить</button>
                            </div>

                        </li>
                    ))}
                </ul>
            ) : (
                <p>Здесь пока что ничего нет</p>
            )}
        </div>
    );
}

export default App;
