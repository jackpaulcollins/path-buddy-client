import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {selectCurrentPathDate} from '../../../features/paths/pathStatsSlice';
import ThumbsUp from '../../../assets/icons/ThumbsUp';
import ThumbsDown from '../../../assets/icons/ThumbsDown';
import PathScheduleParser from '../../../utils/PathScheduleParser';
import {useCreatePathUnitReportMutation, useGetPathUnitReportMutation} from '../../../features/path_unit_reports/pathUnitReportApiSlice';
import ComponentLoading from '../../general/ComponentLoading';

function PathUnitSection({unit, reFetchPath}) {
  PathUnitSection.propTypes = {
    unit: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      schedule: PropTypes.string.isRequired,
      polarity: PropTypes.string.isRequired,
    }),
    reFetchPath: PropTypes.func.isRequired,
  };

  const [createReport] = useCreatePathUnitReportMutation();
  const [getReport] = useGetPathUnitReportMutation();
  const [reportState, setReportState] = useState();
  const [loading, setLoading] = useState(true);
  const date = useSelector(selectCurrentPathDate);

  const {
    id, name, schedule, polarity,
  } = unit;

  const fetchReport = async () => {
    setLoading(true);
    try {
      const response = await getReport({
        id,
        date,
      }).unwrap();
      const {report} = response.data;
      setReportState(report?.status);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);

    fetchReport();
    setLoading(false);
  }, [date]);

  const createNewReport = async (status) => {
    await createReport({
      path_unit_report: {
        path_unit_id: id,
        date,
        status,
      },
    });
    fetchReport();
    reFetchPath();
  };

  const parsedSchedule = (unitSchedule, unitPolarity) => {
    if (!unitSchedule.startsWith('custom=')) {
      return new PathScheduleParser(unitSchedule, unitPolarity).periodDisplay();
    }

    return new PathScheduleParser(schedule, polarity).parse();
  };

  const maybeMarkSelected = (passOrFail) => (passOrFail === reportState ? '#7173f5' : 'none');

  const renderPathActionSection = () => (
    <div className="w-1/2 inline-flex justify-evenly">
      <div
        className="hover:cursor-pointer"
        onClick={() => {
          createNewReport('pass');
        }}
      >
        <ThumbsUp extraClasses={maybeMarkSelected('pass')} />
      </div>
      <div
        className="hover:cursor-pointer"
        onClick={() => {
          createNewReport('fail');
        }}
      >
        <ThumbsDown extraClasses={maybeMarkSelected('fail')} />
      </div>
    </div>
  );

  const parsePolarity = (unitPolarity) => (unitPolarity === 'positive' ? 'execute' : 'avoid');
  const polarityColor = (unitPolarity) => (unitPolarity === 'positive' ? 'green' : 'red');

  if (loading) {
    return (
      <div className="h-full p-2 flex justify-center w-full">
        <ComponentLoading />
      </div>
    );
  }

  return (
    <div className="p-2 sm:px-8 grid grid-cols-3 sm:grid-cols-4">
      <div className="justify-center select-none flex">
        <span className={`bg-${polarityColor(polarity)}-200 border border-${polarityColor(polarity)}-500 text-${polarityColor(polarity)}-900 text-sm font-normal p-2 rounded-full`}>
          {parsePolarity(polarity)}
        </span>
      </div>

      <div className="flex flex-row justify-center items-center">
        <div className="justify-center items-center sm:flex flex-col">
          <dt className="text-sm font-medium text-gray-900">{name}</dt>
          <dt className="sm:hidden text-sm min-w-1/3 text-gray-700">
            {parsedSchedule(schedule, polarity)}
          </dt>
        </div>
      </div>

      <div className="hidden sm:flex sm:flex-row sm:justify-center sm:items-center">
        <dd className="mt-1 text-sm text-gray-700">
          {parsedSchedule(schedule, polarity)}
        </dd>
      </div>
      <div className="flex flex-row justify-center items-center">{renderPathActionSection()}</div>
    </div>
  );
}

export default PathUnitSection;
