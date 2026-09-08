import './styles/index.scss';
import carData from './car-dataset.json';

const yearSelect = document.querySelector('#year');
const makeSelect = document.querySelector('#make');
const modelSelect = document.querySelector('#model');

const resetSelect = (select, text) => {
    select.innerHTML = `<option value="">${text}</option>`;
    select.disabled = true;
};

const addOptions = (select, values) => {
    values.forEach(value => {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        select.appendChild(option);
    });

    select.disabled = false;
};

const years = [...new Set(carData.map(car => car.year))].sort((a, b) => b - a);

addOptions(yearSelect, years);

makeSelect.disabled = true;
modelSelect.disabled = true;

yearSelect.addEventListener('change', () => {
    const selectedYear = yearSelect.value;

    resetSelect(makeSelect, 'Select Make');
    resetSelect(modelSelect, 'Select Model');

    if (!selectedYear) {
        return;
    }

    const manufacturers = [
        ...new Set(
            carData
                .filter(car => String(car.year) === selectedYear)
                .map(car => car.Manufacturer)
        )
    ].sort();

    addOptions(makeSelect, manufacturers);
});

makeSelect.addEventListener('change', () => {
    const selectedYear = yearSelect.value;
    const selectedMake = makeSelect.value;

    resetSelect(modelSelect, 'Select Model');

    if (!selectedYear || !selectedMake) {
        return;
    }

    const models = [
        ...new Set(
            carData
                .filter(
                    car =>
                        String(car.year) === selectedYear &&
                        car.Manufacturer === selectedMake
                )
                .map(car => car.model)
        )
    ].sort();

    addOptions(modelSelect, models);
});

modelSelect.addEventListener('change', () => {
    const selectedYear = yearSelect.value;
    const selectedMake = makeSelect.value;
    const selectedModel = modelSelect.value;

    if (!selectedYear || !selectedMake || !selectedModel) {
        return;
    }

    const selectedCar = carData.find(
        car =>
            String(car.year) === selectedYear &&
            car.Manufacturer === selectedMake &&
            car.model === selectedModel
    );

    console.log(selectedCar);
});